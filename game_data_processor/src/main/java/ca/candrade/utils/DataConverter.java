package ca.candrade.utils;

import ca.candrade.data.GameData;
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
    private final String FILENAME;
    private final String CSVFILELOCATION;
    private final String JSONFILELOCATION;
    private final List<GameData> GAMEDATALIST;
    
    public DataConverter(String fileName) {
        FILENAME = fileName;
        CSVFILELOCATION = "./src/main/resources/csv_data/" +FILENAME+ ".csv";
        JSONFILELOCATION = "./src/main/resources/json_data/" +FILENAME+ ".json";
        GAMEDATALIST = new ArrayList<>();
    }
    
    public void parseCSVData() throws IOException {
        BufferedReader br = new BufferedReader(
                new FileReader(new File(CSVFILELOCATION)));
        LOG.info("Sucessfully loaded data from: " + CSVFILELOCATION);
        // Toss the first line as it just contains column titles
        String line = br.readLine();
        while ((line = br.readLine()) != null) {
            String[] columnData = line.split(",");
            if (FILENAME == "vgsales-12-4-2019")
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
            else if (FILENAME == "vgsales")
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
    
    public void writeDataToFile() throws IOException {
        LOG.info("Begin writing json data to: " + JSONFILELOCATION);
        ObjectMapper mapper = new ObjectMapper();
        mapper.writerWithDefaultPrettyPrinter().writeValue(
                new File(JSONFILELOCATION), GAMEDATALIST);
        LOG.info("Successfully wrote to: " + JSONFILELOCATION);
        LOG.info("Clearing list");
        GAMEDATALIST.clear();
        LOG.info(GAMEDATALIST.size() + " entries in list");
    }
}