package ca.candrade.app;

import ca.candrade.data.GameData;
import ca.candrade.data.ImageData;
import ca.candrade.data.TransformedGameData;
import ca.candrade.utils.DataConverter;
import ca.candrade.utils.DataTransformer;
import ca.candrade.utils.ImageProcessor;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.LoggerFactory;

/**
 * Class used for running the data converter
 *
 * @author Christian Andrade
 */
public class GenerateData {

    //Logger
    private final static org.slf4j.Logger LOG
            = LoggerFactory.getLogger(GenerateData.class);
    private static List<GameData> largeSet;
    private static List<GameData> smallSet;
    private static final List<TransformedGameData> DATASET = new ArrayList<>();
    private static final DataConverter DATACONVERTER = new DataConverter();
    private static final DataTransformer DATATRANSFORMER 
            = new DataTransformer();
    private static final List<ImageData> imageDataList 
            = new ArrayList<>();

    // Main method to run the program
    public static void main(String[] args) {
        assignDataSets();
        try {
            performTransformation();
            DATACONVERTER.writeListDataToFile(DATASET);
        } catch (IOException ex) {
            LOG.error(ex.getLocalizedMessage());
        }
        convertImagesToBlobs();
    }

    private static void convertImagesToBlobs() {
        LOG.info("Perform image conversion.");
        ImageProcessor processImages = new ImageProcessor();
        for (int i = 0; i < imageDataList.size(); i++) {
            // simple percentage calulator for determining how much work is left.
            if (i % (imageDataList.size() / 100) == 0) {
                LOG.info("Image Processing: "
                        + i / (imageDataList.size() / 100) + "% complete.");
            }
            processImages.processImage(imageDataList.get(i));
        }
    }

    // Compares data from the two datasets and using that finds an entry in both
    // and merges the data into one entry.
    private static void performTransformation() {
        LOG.info("Perform data transformation.");
        for (int i = 0; i < smallSet.size(); i++) {
            // simple percentage calulator for determining how much work is left.
            if (i % (smallSet.size() / 100) == 0) {
                LOG.info("Data Transformation: "
                        + i / (smallSet.size() / 100) + "% complete.");
            }
            int foundIndex = DATATRANSFORMER
                    .findMatchingGame(smallSet.get(i), largeSet);
            if (foundIndex != -1) {
                if (!largeSet.get(foundIndex)
                        .getIMAGEURL()
                        .equals("/games/boxart/default.jpg")) {
                    // Once a match is found, creates an element in the imageDataList
                    imageDataList.add(
                            new ImageData(
                                    largeSet.get(foundIndex).getNAME(),
                                    largeSet.get(foundIndex).getPLATFORM(),
                                    largeSet.get(foundIndex).getIMAGEURL()
                            )
                    );
                }
                DATASET.add(DATATRANSFORMER
                        .transformData(smallSet.get(i),
                                largeSet.remove(foundIndex)));
            }
        }
        LOG.info("Data transformation complete. " + DATASET.size()
                + " entries created. " + (smallSet.size() - DATASET.size())
                + " entries dropped.");
    }

    // Assigns the datasets to dedicated variables
    private static void assignDataSets() {
        LOG.info("Assigning the datasets to lists.");
        try {
            DATACONVERTER.parseCSVData("vgsales-12-4-2019");
            largeSet = new ArrayList<>(DATACONVERTER.getGameDataList());
            DATACONVERTER.parseCSVData("vgsales");
            smallSet = new ArrayList<>(DATACONVERTER.getGameDataList());
        } catch (IOException ex) {
            LOG.error(ex.getLocalizedMessage());
        }
        LOG.info("Dataset assignment complete.");
    }
}
