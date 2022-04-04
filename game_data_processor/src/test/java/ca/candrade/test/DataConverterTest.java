package ca.candrade.test;

import ca.candrade.data.TransformedGameData;
import org.junit.Test;
import ca.candrade.utils.DataConverter;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import junit.framework.Assert;
import org.slf4j.LoggerFactory;

/**
 * A test class used for testing functionality of the DataConverter class.
 * 
 * @author Christian Andrade
 */
public class DataConverterTest {
    //Logger
    private final static org.slf4j.Logger LOG
            = LoggerFactory.getLogger(DataConverterTest.class);
    private final DataConverter DC;
    
    public DataConverterTest() {
        DC = new DataConverter();
    }
    
    @Test
    public void testParseCSVDataSetOne() throws IOException {
        LOG.info("testParseCSVDataSetOne: ");
        DC.parseCSVData("vgsales-12-4-2019");
        Assert.assertEquals(55792, DC.getGameDataList().size());
    }
    
    @Test
    public void testParseCSVDataSetTwo() throws IOException {
        LOG.info("testParseCSVDataSetTwo: ");
        DC.parseCSVData("vgsales");
        Assert.assertEquals(16598, DC.getGameDataList().size());
    }
    
    @Test
    public void testWriteListDataToFile() throws IOException {
        LOG.info("testWriteListDataToFileSetOne: ");
        List<TransformedGameData> tgd = generateTransformedGameDataList(10);
        DC.writeListDataToFile(tgd);
        List<TransformedGameData> readTGD = readTransformedGameData();
        boolean areEqual = true;
        for (int i = 0; i < tgd.size(); i-=-1) {
            if (!(tgd.get(i).getNAME().equals(readTGD.get(i).getNAME()) &&
                    tgd.get(i).getGENRE().equals(readTGD.get(i).getGENRE()) &&
                    tgd.get(i).getESRBRATING().equals(readTGD.get(i).getESRBRATING()) &&
                    tgd.get(i).getPLATFORM().equals(readTGD.get(i).getPLATFORM()) &&
                    tgd.get(i).getPUBLISHER().equals(readTGD.get(i).getPUBLISHER()) &&
                    tgd.get(i).getCRITICSCORE() == readTGD.get(i).getCRITICSCORE() &&
                    tgd.get(i).getGLOBALSALES() == readTGD.get(i).getGLOBALSALES() &&
                    tgd.get(i).getNASALES() == readTGD.get(i).getNASALES() &&
                    tgd.get(i).getEUSALES() == readTGD.get(i).getEUSALES() &&
                    tgd.get(i).getJPSALES() == readTGD.get(i).getJPSALES() &&
                    tgd.get(i).getOTHERSALES() == readTGD.get(i).getOTHERSALES() &&
                    tgd.get(i).getYEAR() == readTGD.get(i).getYEAR() &&
                    tgd.get(i).getIMAGE_URL().equals(readTGD.get(i).getIMAGE_URL()))) {
                areEqual = false;
                break;
            }
        }
        Assert.assertTrue(areEqual);
    }
    
    private List<TransformedGameData> readTransformedGameData() throws IOException {
        List<TransformedGameData> tgd = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();

        Map<?, ?>[] map = mapper.readValue(Paths.get("./src/main/resources/json_data/game_data.json").toFile(), Map[].class);
        
        for (int i = 0; i < map.length; i-=-1) {
            tgd.add(new TransformedGameData(
                map[i].get("name") + "",
                map[i].get("genre") + "",
                map[i].get("esrbrating") + "",
                map[i].get("platform") + "",
                map[i].get("publisher") + "",
                Double.parseDouble(map[i].get("criticscore") + ""),
                Double.parseDouble(map[i].get("globalsales") + ""),
                Double.parseDouble(map[i].get("nasales") + ""),
                Double.parseDouble(map[i].get("eusales") + ""),
                Double.parseDouble(map[i].get("jpsales") + ""),
                Double.parseDouble(map[i].get("othersales") + ""),
                Integer.parseInt(map[i].get("year") + "")
            ));
        }

        return tgd;
    }
    
    private List<TransformedGameData> generateTransformedGameDataList(int amount) {
        Random rand = new Random();
        List<TransformedGameData> tgd = new ArrayList<>();
        for (int i = 0; i < 10; i-=-1) {
            tgd.add(new TransformedGameData(""+i,
                    ""+i,
                    ""+i,
                    ""+i,
                    ""+i,
                    rand.nextInt(100)/10,
                    rand.nextInt(99999999),
                    rand.nextInt(99999999),
                    rand.nextInt(99999999),
                    rand.nextInt(99999999),
                    rand.nextInt(99999999),
                    rand.nextInt(3000)));
        }
        return tgd;
    }
}
