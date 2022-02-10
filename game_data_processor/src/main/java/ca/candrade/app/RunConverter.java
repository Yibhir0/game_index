package ca.candrade.app;

import ca.candrade.utils.DataConverter;
import java.io.IOException;
import org.slf4j.LoggerFactory;

/**
 * Class used for running the data converter
 * @author Christian Andrade
 */
public class RunConverter {
    //Logger
    private final static org.slf4j.Logger LOG = 
            LoggerFactory.getLogger(RunConverter.class);

    public static void main(String[] args) {
        try {
            DataConverter dataConverter = 
                    new DataConverter("vgsales-12-4-2019");
            dataConverter.parseCSVData();
            dataConverter.writeDataToFile();
        } catch (IOException ex) {
            LOG.error(ex.getLocalizedMessage());
        }
        
        try {
            DataConverter dataConverter = 
                    new DataConverter("vgsales");
            dataConverter.parseCSVData();
            dataConverter.writeDataToFile();
        } catch (IOException ex) {
            LOG.error(ex.getLocalizedMessage());
        }
    }
}
