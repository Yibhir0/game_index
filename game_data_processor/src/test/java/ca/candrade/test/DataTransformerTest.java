package ca.candrade.test;

import ca.candrade.data.GameData;
import org.junit.Test;
import ca.candrade.utils.DataTransformer;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.junit.Assert;
import org.slf4j.LoggerFactory;

/**
 * A test class used for testing functionality of the DataTransformer class.
 * 
 * @author Christian Andrade
 */
public class DataTransformerTest {
    //Logger
    private final static org.slf4j.Logger LOG
            = LoggerFactory.getLogger(DataTransformerTest.class);
    
    private final DataTransformer DT;
    
    public DataTransformerTest() {
        DT = new DataTransformer();
    }
    
    @Test
    public void testTransformDataNASales() {
        LOG.info("testTransformDataNASales");
        List<GameData> generatedGames = generateGameDataList(2);
        Assert.assertEquals(
                DT.transformData(
                        generatedGames.get(0),
                        generatedGames.get(1)
                ).getNASALES(),
                correctDoubleValues(
                        generatedGames.get(0).getNASALES(),
                        generatedGames.get(1).getNASALES()
                ),
                0
        );
    }
    
    @Test
    public void testTransformDataEUSales() {
        LOG.info("testTransformDataEUSales");
        List<GameData> generatedGames = generateGameDataList(2);
        Assert.assertEquals(
                DT.transformData(
                        generatedGames.get(0),
                        generatedGames.get(1)
                ).getEUSALES(),
                correctDoubleValues(
                        generatedGames.get(0).getEUSALES(),
                        generatedGames.get(1).getEUSALES()
                ),
                0
        );
    }
    
    @Test
    public void testTransformDataJPSales() {
        LOG.info("testTransformDataJPSales");
        List<GameData> generatedGames = generateGameDataList(2);
        Assert.assertEquals(
                DT.transformData(
                        generatedGames.get(0),
                        generatedGames.get(1)
                ).getJPSALES(),
                correctDoubleValues(
                        generatedGames.get(0).getJPSALES(),
                        generatedGames.get(1).getJPSALES()
                ),
                0
        );
    }
    
    @Test
    public void testTransformDataOtherSales() {
        LOG.info("testTransformDataOtherSales");
        List<GameData> generatedGames = generateGameDataList(2);
        Assert.assertEquals(
                DT.transformData(
                        generatedGames.get(0),
                        generatedGames.get(1)
                ).getOTHERSALES(),
                correctDoubleValues(
                        generatedGames.get(0).getOTHERSALES(),
                        generatedGames.get(1).getOTHERSALES()
                ),
                0
        );
    }
    
    @Test
    public void testTransformDataGlobalSales() {
        LOG.info("testTransformDataGlobalSales");
        List<GameData> generatedGames = generateGameDataList(2);
        Assert.assertEquals(
                DT.transformData(
                        generatedGames.get(0),
                        generatedGames.get(1)
                ).getGLOBALSALES(),
                correctGlobalSales(
                        correctDoubleValues(
                                generatedGames.get(0).getTOTALSHIPPED(),
                                generatedGames.get(1).getTOTALSHIPPED()
                        ),
                        correctDoubleValues(
                                generatedGames.get(0).getNASALES(),
                                generatedGames.get(1).getNASALES()
                        ),
                        correctDoubleValues(
                                generatedGames.get(0).getEUSALES(),
                                generatedGames.get(1).getEUSALES()
                        ),
                        correctDoubleValues(
                                generatedGames.get(0).getJPSALES(),
                                generatedGames.get(1).getJPSALES()
                        ),
                        correctDoubleValues(
                                generatedGames.get(0).getOTHERSALES(),
                                generatedGames.get(1).getOTHERSALES()
                        ),
                        correctDoubleValues(
                                generatedGames.get(0).getGLOBALSALES(),
                                generatedGames.get(1).getGLOBALSALES()
                        )
                ),
                0
        );
    }
    
    @Test
    public void testTransformDataESRBRating() {
        LOG.info("testTransformDataESRBRating");
        List<GameData> generatedGames = generateGameDataList(2);
        Assert.assertEquals(
                DT.transformData(
                        generatedGames.get(0),
                        generatedGames.get(1)
                ).getESRBRATING(),
                correctESRBRating(
                        generatedGames.get(1).getESRBRATING()
                )
        );
    }
    
    private String correctESRBRating(String esrbRating) {
        if (esrbRating.equals("")) return "Unknown";
        else return esrbRating;
    }
    
    private double correctGlobalSales(double totalShipped,
            double naSales,
            double euSales,
            double jpSales,
            double otherSales,
            double globalSales) {
        double totalRegionSpecific = naSales + euSales + jpSales + otherSales;
        if (totalShipped != 0 
                && totalRegionSpecific != 0 
                && globalSales != 0) 
            return Math.round(
                    (totalShipped + totalRegionSpecific + globalSales)/3
            );
        else if (totalShipped == 0 
                && totalRegionSpecific != 0 
                && globalSales != 0)
            return Math.round((totalRegionSpecific+globalSales)/2);
        else if (totalShipped != 0 
                && totalRegionSpecific == 0 
                && globalSales != 0)
            return Math.round((totalShipped+globalSales)/2);
        else if (totalShipped != 0 
                && totalRegionSpecific != 0 
                && globalSales == 0)
            return Math.round((totalShipped+totalRegionSpecific)/2);
        else if (totalShipped == 0 
                && totalRegionSpecific == 0 
                && globalSales != 0)
            return globalSales;
        else if (totalShipped != 0 
                && totalRegionSpecific == 0 
                && globalSales == 0)
            return totalShipped;
        else if (totalShipped == 0 
                && totalRegionSpecific != 0 
                && globalSales == 0)
            return totalRegionSpecific;
        else 
            return 0;
    }
    
    private double correctDoubleValues(double dataOne,
            double dataTwo) {
        if (dataOne != 0 && dataTwo != 0) 
            return Math.round((dataOne + dataTwo)/2);
        else if (dataOne != 0 && dataTwo == 0) return dataOne;
        else if (dataOne == 0 && dataTwo != 0) return dataTwo;
        else return 0;
    }
    
    @Test
    public void testFindMatchingGame() {
        LOG.info("testFindMatchingGame");
        List<GameData> generatedGames = generateGameDataList(10);
        boolean testStatus = true;
        for (int i = 0; i < generatedGames.size(); i-=-1) {
            if (DT.findMatchingGame(generatedGames.get(i), generatedGames) == -1) {
                testStatus = false;
                break;
            }
        }
        Assert.assertTrue(testStatus);
    }
    
    private List<GameData> generateGameDataList(int amount) {
        Random rand = new Random();
        List<GameData> gd = new ArrayList<>();
        for (int i = 0; i < amount; i-=-1) {
            gd.add(new GameData(""+rand.nextInt(),
                    ""+rand.nextInt(),
                    ""+rand.nextInt(),
                    ""+rand.nextInt(),
                    ""+rand.nextInt(),
                    ""+rand.nextInt(100)/10,
                    ""+rand.nextInt(99999999),
                    ""+rand.nextInt(99999999),
                    ""+rand.nextInt(99999999),
                    ""+rand.nextInt(99999999),
                    ""+rand.nextInt(99999999),
                    ""+rand.nextInt(99999999),
                    ""+rand.nextInt(3000),
                    ""+rand.nextInt()));
        }
        return gd;
    }
}
