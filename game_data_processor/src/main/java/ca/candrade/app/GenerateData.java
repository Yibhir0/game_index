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

    public static void main(String[] args) {
        assignDataSets();
        try {
            performTransformation();
            DATACONVERTER.writeListDataToFile(DATASET);
        } catch (IOException ex) {
            LOG.error(ex.getLocalizedMessage());
        }
        //convertImagesToBlobs();
    }

    private static void convertImagesToBlobs() {
        LOG.info("Perform image conversion.");
        ImageProcessor processImages = new ImageProcessor();
        for (int i = 0; i < imageDataList.size(); i++) {
            if (i % (imageDataList.size() / 100) == 0) {
                LOG.info("Image Processing: "
                        + i / (imageDataList.size() / 100) + "% complete.");
            }
            processImages.processImage(imageDataList.get(i));
        }
    }

    private static boolean hasSameName(List<String> list, String name) {
        for (String s : list) {
            if (name.equals(s)) {
                return true;
            }
        }
        return false;
    }

    private static void performTransformation() {
        LOG.info("Perform data transformation.");
        List<String> foundGameNames = new ArrayList<String>();
        for (int i = 0; i < smallSet.size(); i++) {
            if (i % (smallSet.size() / 100) == 0) {
                LOG.info("Data Transformation: "
                        + i / (smallSet.size() / 100) + "% complete.");
            }
            if (hasSameName(foundGameNames, smallSet.get(i).getNAME())) {
                continue;
            }
            foundGameNames.add(smallSet.get(i).getNAME());
            List<Integer> foundIndices = DATATRANSFORMER
                    .findMatchingGame(smallSet.get(i), largeSet);
            if (!foundIndices.isEmpty()) {
                List<GameData> foundGames = new ArrayList<GameData>();
                for (int index : foundIndices) {
                    foundGames.add(largeSet.remove(index));
                }
                if (foundIndices.size() > 1) {
                    DATASET.add(DATATRANSFORMER
                            .multiTransform(smallSet.get(i),
                                    foundGames));
                } else {
                    DATASET.add(DATATRANSFORMER
                            .transformData(smallSet.get(i),
                                    foundGames.get(0)));
                if (!foundGames.get(0)
                        .getIMAGEURL()
                        .equals("/games/boxart/default.jpg")) {
                    imageDataList.add(
                            new ImageData(
                                    foundGames.get(0).getNAME(),
                                    foundGames.get(0).getPLATFORM(),
                                    foundGames.get(0).getIMAGEURL()
                            )
                    );
                }
                }
            }

        }
        LOG.info("Data transformation complete. " + DATASET.size()
                + " entries created. " + (smallSet.size() - DATASET.size())
                + " entries dropped.");
    }

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
