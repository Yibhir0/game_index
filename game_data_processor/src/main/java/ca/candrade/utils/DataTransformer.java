package ca.candrade.utils;

import ca.candrade.data.GameData;
import ca.candrade.data.TransformedGameData;
import java.util.List;

/**
 * A class used for transforming the data from two previously created json files
 * into one single dataset
 * @author Christian Andrade
 */
public class DataTransformer {
    
    /**
     * Transforms the game data by eliminating fields that are not needed and
     * takes the average for the sales in all given regions.
     * 
     * @param gameDataOne A game data object for a specific game from data set
     * one.
     * @param gameDataTwo A game data object for the same specific game from 
     * data set two.
     * @return A TransformedGameData object.
     */
    public TransformedGameData transformData(GameData gameDataOne,
            GameData gameDataTwo) {
        double totalShipped = correctDoubleValues(gameDataOne.getTOTALSHIPPED(),
                gameDataTwo.getTOTALSHIPPED());
        double naSales = correctDoubleValues(gameDataOne.getNASALES(),
                gameDataTwo.getNASALES());
        double euSales = correctDoubleValues(gameDataOne.getEUSALES(),
                gameDataTwo.getEUSALES());
        double jpSales = correctDoubleValues(gameDataOne.getJPSALES(),
                gameDataTwo.getJPSALES());
        double otherSales = correctDoubleValues(gameDataOne.getOTHERSALES(),
                gameDataTwo.getOTHERSALES());
        double globalSales = correctDoubleValues(gameDataOne.getGLOBALSALES(),
                gameDataTwo.getGLOBALSALES());
        globalSales = correctGlobalSales(totalShipped,
                naSales,
                euSales,
                jpSales,
                otherSales,
                globalSales);
        
        return new TransformedGameData(gameDataTwo.getNAME(),
                gameDataTwo.getGENRE(),
                correctESRBRating(gameDataTwo.getESRBRATING()),
                gameDataTwo.getPLATFORM(),
                gameDataTwo.getPUBLISHER(),
                gameDataTwo.getCRITICSCORE(),
                globalSales,
                naSales,
                euSales,
                jpSales,
                otherSales,
                gameDataTwo.getYEAR()
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
    
    /**
     * Searches through the second gameList for a game with the same name and 
     * release year as the provided gamedata.
     * 
     * @param gameData The game to search for.
     * @param gameList The list to search in.
     * @return The matching game's index.
     */
    public int findMatchingGame(GameData gameData,
            List<GameData> gameList) {
        for (int i = 0; i < gameList.size(); i++) {
            if (normaliseString(gameData.getNAME())
                    .equals(normaliseString(gameList.get(i).getNAME())) && 
                    normaliseString(gameData.getPLATFORM())
                    .equals(normaliseString(gameList.get(i).getPLATFORM())))
                return i;
        }
        return -1;
    }
    
    private String normaliseString(String gameName) {
        return gameName.replaceAll("\\W_", "").toLowerCase();
    }
}
