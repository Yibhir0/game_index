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
 * @author Christian Andrade
 */
public class DataConverter {
    //Logger
    private final static org.slf4j.Logger LOG = 
            LoggerFactory.getLogger(DataConverter.class);
    private final String CSVFILELOCATION = "./src/main/resources/csv_data/";
    private final String JSONFILELOCATION = 
            "./src/main/resources/json_data/game_data.json";
    private final List<GameData> GAMEDATALIST;
    
    public DataConverter() {
        GAMEDATALIST = new ArrayList<>();
    }
    
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
            if (fileName.equals("vgsales-12-4-2019"))
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
                                columnData[17]
                ));
            else if (fileName.equals("vgsales"))
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
                                columnData[3]
                ));
        }
        LOG.info("Successfully populated list with: " +
                GAMEDATALIST.size() + " entries");
    }
    
    /**
     * 
     * @param tgdList Writes a transformed game data list to a JSON file.
     * @throws IOException Thrown if the file could not be found.
     */
    public void writeDataToFile(List<TransformedGameData> tgdList) 
            throws IOException {
        LOG.info("Begin writing json data to: " + JSONFILELOCATION);
        ObjectMapper mapper = new ObjectMapper();
        mapper.writerWithDefaultPrettyPrinter().writeValue(
                new File(JSONFILELOCATION), tgdList);
        LOG.info("Successfully wrote to: " + JSONFILELOCATION);
    }
}