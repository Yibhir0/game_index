package ca.candrade.utils;

import ca.candrade.data.GameData;
import ca.candrade.data.TransformedGameData;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.LoggerFactory;

/**
 * A class designed to convert game data from the CSV format to JSON format for
 * use with a MongoDB database.
 *
 * @author Christian Andrade
 */
public class DataConverter {

    //Logger
    private final static org.slf4j.Logger LOG
            = LoggerFactory.getLogger(DataConverter.class);
    private final String CSVFILELOCATION = "./src/main/resources/csv_data/";
    private final String JSONFILELOCATION
            = "./src/main/resources/json_data/";
    private final List<GameData> GAMEDATALIST;

    /**
     * Constructor for the Data Converter that instantiates some necessary 
     * components.
     */
    public DataConverter() {
        GAMEDATALIST = new ArrayList<>();
        File f = new File("./src/main/resources/json_data/image_data");
        if (f.exists()) {
            LOG.info("Deleting contents before starting...");
            deleteDirectory(new File(JSONFILELOCATION));
            LOG.info(JSONFILELOCATION + " is now emptied.");
        }
        LOG.info("Creating dir: " + JSONFILELOCATION);
        f.mkdirs();
        LOG.info("Done");
    }

    private boolean deleteDirectory(File directoryToBeDeleted) {
        File[] allContents = directoryToBeDeleted.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                deleteDirectory(file);
            }
        }
        return directoryToBeDeleted.delete();
    }

    /**
     * Returns the list of GameData.
     * @return the list of GameData.
     */
    public List<GameData> getGameDataList() {
        return GAMEDATALIST;
    }

    /**
     * A method used for parsing a video game csv data file and create a game
     * data object accordingly.
     *
     * @param fileName The csv filename.
     * @throws IOException Thrown if the file could not be found.
     */
    public void parseCSVData(String fileName) throws IOException {
        GAMEDATALIST.clear();
        String csvPath = CSVFILELOCATION + fileName + ".csv";
        BufferedReader br = new BufferedReader(
                new FileReader(new File(csvPath)));
        LOG.info("Sucessfully loaded data from: " + csvPath);
        // Toss the first line as it just contains column titles
        String line = br.readLine();
        while ((line = br.readLine()) != null) {
            String[] columnData = line.split(",");
            if (fileName.equals("vgsales-12-4-2019")) {
                GAMEDATALIST.add(
                        new GameData(columnData[1],
                                columnData[3],
                                columnData[4],
                                columnData[5],
                                columnData[6],
                                columnData[9],
                                columnData[11],
                                columnData[12],
                                columnData[13],
                                columnData[14],
                                columnData[15],
                                columnData[16],
                                columnData[17],
                                columnData[22]
                        ));
            } else if (fileName.equals("vgsales")) {
                GAMEDATALIST.add(
                        new GameData(columnData[1],
                                columnData[4],
                                "",
                                columnData[2],
                                columnData[5],
                                "",
                                "",
                                columnData[10],
                                columnData[6],
                                columnData[7],
                                columnData[8],
                                columnData[9],
                                columnData[3],
                                ""
                        ));
            }
        }
        LOG.info("Successfully populated list with: "
                + GAMEDATALIST.size() + " entries");
    }

    /**
     * Writes a transformed game data list to a JSON file.
     *
     * @param tgdList Transformed game data list to be written to a JSON file.
     * @throws IOException Thrown if the file could not be found.
     */
    public void writeListDataToFile(List<TransformedGameData> tgdList)
            throws IOException {
        LOG.info("Begin writing transformed game data data to: "
                + JSONFILELOCATION + "game_data.json");
        ObjectMapper mapper = new ObjectMapper();
        mapper.writerWithDefaultPrettyPrinter().writeValue(
                new File(JSONFILELOCATION + "game_data.json"), tgdList);
        LOG.info("Successfully wrote to: " + JSONFILELOCATION
                + "game_data.json");
    }
}
