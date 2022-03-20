package ca.candrade.data;

import java.util.ArrayList;
import java.util.List;

/**
 * Object used for storing transformed GameData.
 *
 * @author Christian Andrade
 */
public class TransformedGameData {

    private final String NAME;
    private final String GENRE;
    private final String ESRBRATING;
    private final List<String> PLATFORM;
    private final String PUBLISHER;
    private double criticScore;
    private double globalSales;
    private double naSales;
    private double euSales;
    private double jpSales;
    private double otherSales;
    private final int YEAR;
    private final List<String> IMAGE_URL;

    /**
     * A constructor for all the required parameters for a game.
     * 
     * @param NAME The name of the game.
     * @param GENRE The genre of the game.
     * @param ESRBRATING The ESRTB rating of the game.
     * @param PLATFORM The platform for the game.
     * @param PUBLISHER The publisher of the game.
     * @param criticScore The Critic's score of the game.
     * @param globalSales The Global Sales of the game.
     * @param naSales The North American sales of the game.
     * @param euSales The European sales of the game.
     * @param jpSales The Japanese sales of the game.
     * @param otherSales The other sales of the game.
     * @param YEAR The release year of the game.
     */
    public TransformedGameData(String NAME,
            String GENRE,
            String ESRBRATING,
            String PLATFORM,
            String PUBLISHER,
            double criticScore,
            double globalSales,
            double naSales,
            double euSales,
            double jpSales,
            double otherSales,
            int YEAR) {
        this.NAME = NAME;
        this.GENRE = GENRE;
        this.ESRBRATING = ESRBRATING;
        this.PLATFORM = new ArrayList<String>();
        this.PLATFORM.add(PLATFORM);
        this.PUBLISHER = PUBLISHER;
        this.criticScore = Math.floor(criticScore*10)/10;
        this.globalSales = Math.floor(globalSales);
        this.naSales = Math.floor(naSales);
        this.euSales = Math.floor(euSales);
        this.jpSales = Math.floor(jpSales);
        this.otherSales = Math.floor(otherSales);
        this.YEAR = YEAR;
        IMAGE_URL = new ArrayList<String>();
        addImageToList(PLATFORM);
    }
    
    private void addImageToList(String platform) {
        IMAGE_URL.add(normaliseString(NAME) +
                "_" +
                normaliseString(platform) +
                ".jpg");
    }
    
    public void updateCriticScore(double score) {
        if (score != 0 && criticScore != 0) {
            criticScore = Math.floor(((criticScore + score)*10)/2)/10;
        } else if (criticScore == 0 && score != 0) {
            criticScore = score;
        }
    }
    
    public void addToPlatformList(String name) {
        PLATFORM.add(name);
        addImageToList(name);
    }
    
    public void addToNASales(double value) {
        naSales+=Math.floor(value);
    }
    
    public void addToEUSales(double value) {
        euSales+=Math.floor(value);
    }
    
    public void addToJPSales(double value) {
        jpSales+=Math.floor(value);
    }
    
    public void addToOtherSales(double value) {
        otherSales+=Math.floor(value);
    }
    
    public void addToGlobalSales(double value) {
        globalSales+=Math.floor(value);
    }

    /**
     * Returns the game's image URL.
     * @return the game's image URL.
     */
    public List<String> getIMAGE_URL() {
        return IMAGE_URL;
    }
    
    private String normaliseString(String s) {
        return s.replaceAll("[^A-Za-z0-9 ]", "")
                                .replaceAll(" ", "_")
                                .toLowerCase();
    }
    
    /**
     * Returns the game's name.
     * @return the game's name.
     */
    public String getNAME() {
        return NAME;
    }

    /**
     * Returns the game's genre.
     * @return the game's genre.
     */
    public String getGENRE() {
        return GENRE;
    }

    /**
     * Returns the game's ESRB rating.
     * @return the game's ESRB rating.
     */
    public String getESRBRATING() {
        return ESRBRATING;
    }

    /**
     * Returns the game's platform.
     * @return the game's platform.
     */
    public List<String> getPLATFORM() {
        return PLATFORM;
    }

    /**
     * Returns the game's publisher.
     * @return the game's publisher.
     */
    public String getPUBLISHER() {
        return PUBLISHER;
    }

    /**
     * Returns the game's critic score.
     * @return the game's critic score.
     */
    public double getCriticScore() {
        return criticScore;
    }

    /**
     * Returns the game's global sales.
     * @return the game's global sales.
     */
    public double getGlobalSales() {
        return globalSales;
    }

    /**
     * Returns the game's North American sales.
     * @return the game's North American sales.
     */
    public double getNaSales() {
        return naSales;
    }

    /**
     * Returns the game's European sales.
     * @return the game's European sales.
     */
    public double getEuSales() {
        return euSales;
    }

    /**
     * Returns the game's Japanese sales.
     * @return the game's Japanese sales.
     */
    public double getJpSales() {
        return jpSales;
    }

    /**
     * Returns the game's other sales.
     * @return the game's other sales.
     */
    public double getOtherSales() {
        return otherSales;
    }

    /**
     * Returns the game's year.
     * @return the game's year.
     */
    public int getYEAR() {
        return YEAR;
    }

    /**
     * Returns the game's string representation.
     * @return the game's string representation.
     */
    @Override
    public String toString() {
        return "Name: " + NAME + "\n"
                + "Genre: " + GENRE + "\n"
                + "ESRB Rating: " + ESRBRATING + "\n"
                + "Platform: " + PLATFORM + "\n"
                + "Publisher: " + PUBLISHER + "\n"
                + "Critic Score: " + criticScore + "\n"
                + "Global Sales: " + globalSales + "\n"
                + "North America Sales: " + naSales + "\n"
                + "Europe Sales: " + euSales + "\n"
                + "Japan Sales: " + jpSales + "\n"
                + "Other Sales: " + otherSales + "\n"
                + "Release Year: " + YEAR + "\n";
    }
}
