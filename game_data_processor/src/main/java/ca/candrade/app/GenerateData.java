package ca.candrade.app;

import ca.candrade.data.GameData;
import ca.candrade.data.TransformedGameData;
import ca.candrade.utils.DataConverter;
import ca.candrade.utils.DataTransformer;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.LoggerFactory;

/**
 * Class used for running the data converter
 * @author Christian Andrade
 */
public class GenerateData {
    //Logger
    private final static org.slf4j.Logger LOG = 
            LoggerFactory.getLogger(GenerateData.class);
    private static List<GameData> largeSet;
    private static List<GameData> smallSet;
    private static final List<TransformedGameData> DATASET = new ArrayList<>();
    private static final DataConverter DATACONVERTER = new DataConverter();
    private static final DataTransformer DATATRANSFORMER = new DataTransformer();
    
    public static void main(String[] args) {
        assignDataSets();
        performTransformation();
        try {
            DATACONVERTER.writeDataToFile(DATASET);
        } catch (IOException ex) {
            LOG.error(ex.getLocalizedMessage());
        }
    }
    
    private static void performTransformation() {
        LOG.info("Perform data transformation.");
        for (int i = 0; i < smallSet.size(); i++) {
            if (i%829 == 0) 
                LOG.info("Data Transformation: " + 5*i/829 + "% complete.");
            GameData match = DATATRANSFORMER
                    .findMatchingGame(smallSet.get(i), largeSet);
            if (match != null)
                DATASET.add(DATATRANSFORMER
                        .transformData(smallSet.get(i), match));
        }
        LOG.info("Data transformation complete.");
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
