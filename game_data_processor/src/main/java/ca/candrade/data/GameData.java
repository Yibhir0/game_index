package ca.candrade.data;

/**
 * Object used for storing specific properties of a game.
 * @author Christian Andrade
 */
public class GameData {
    private final String NAME;
    private final String GENRE;
    private final String ESRBRATING;
    private final String PLATFORM;
    private final String PUBLISHER;
    private final double CRITICSCORE;
    private final double TOTALSHIPPED;
    private final double GLOBALSALES;
    private final double NASALES;
    private final double EUSALES;
    private final double JPSALES;
    private final double OTHERSALES;
    private final int YEAR;
    private final String IMAGEURL;

    /**
     * A constructor for all the parameters for a game.
     * 
     * @param NAME The name of the game.
     * @param GENRE The genre of the game.
     * @param ESRBRATING The ESRTB rating of the game.
     * @param PLATFORM The platform for the game.
     * @param PUBLISHER The publisher of the game.
     * @param CRITICSCORE The Critic's score of the game.
     * @param TOTALSHIPPED The Total Shipped units for the game.
     * @param GLOBALSALES The Global Sales of the game.
     * @param NASALES The North American sales of the game.
     * @param EUSALES The European sales of the game.
     * @param JPSALES The Japanese sales of the game.
     * @param OTHERSALES The other sales of the game.
     * @param YEAR The release year of the game.
     * @param IMAGEURL The URL of the game's image.
     */
    public GameData(String NAME,
            String GENRE,
            String ESRBRATING,
            String PLATFORM,
            String PUBLISHER,
            String CRITICSCORE,
            String TOTALSHIPPED,
            String GLOBALSALES,
            String NASALES,
            String EUSALES,
            String JPSALES,
            String OTHERSALES,
            String YEAR,
            String IMAGEURL) {
        this.NAME = NAME;
        this.GENRE = GENRE;
        this.ESRBRATING = ESRBRATING;
        this.PLATFORM = PLATFORM;
        this.PUBLISHER = PUBLISHER;
        // Convert data from a 10 point system to a 5 point (star) system
        this.CRITICSCORE = normaliseNumber(CRITICSCORE)/2;
        // Convert data from terms of millions to terms of ones
        this.TOTALSHIPPED = normaliseNumber(TOTALSHIPPED) * 1000000;
        this.GLOBALSALES = normaliseNumber(GLOBALSALES) * 1000000;
        this.NASALES = normaliseNumber(NASALES) * 1000000;
        this.EUSALES = normaliseNumber(EUSALES) * 1000000;
        this.JPSALES = normaliseNumber(JPSALES) * 1000000;
        this.OTHERSALES = normaliseNumber(OTHERSALES) * 1000000;
        this.YEAR = (int) normaliseNumber(YEAR);
        this.IMAGEURL = IMAGEURL;
    }
    
    private double normaliseNumber(String value) {
        if (value.equals("") || value.equals("N/A")) return 0;
        return Double.parseDouble(value);
    }

    /**
     * Returns the game's name.
     * @return
     */
    public String getNAME() {
        return NAME;
    }

    /**
     * Returns the game's genre.
     * @return
     */
    public String getGENRE() {
        return GENRE;
    }

    /**
     * Returns the game's ESRB rating.
     * @return
     */
    public String getESRBRATING() {
        return ESRBRATING;
    }

    /**
     * Returns the game's platform.
     * @return
     */
    public String getPLATFORM() {
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
    public double getCRITICSCORE() {
        return CRITICSCORE;
    }

    /**
     * Returns the game's total shipped.
     * @return the game's total shipped.
     */
    public double getTOTALSHIPPED() {
        return TOTALSHIPPED;
    }

    /**
     * Returns the game's global sales.
     * @return the game's global sales.
     */
    public double getGLOBALSALES() {
        return GLOBALSALES;
    }

    /**
     * Returns the game's North American sales.
     * @return the game's North American sales.
     */
    public double getNASALES() {
        return NASALES;
    }

    /**
     * Returns the game's European sales.
     * @return the game's European sales.
     */
    public double getEUSALES() {
        return EUSALES;
    }

    /**
     * Returns the game's Japanese sales.
     * @return the game's Japanese sales.
     */
    public double getJPSALES() {
        return JPSALES;
    }

    /**
     * Returns the game's other sales.
     * @return the game's other sales.
     */
    public double getOTHERSALES() {
        return OTHERSALES;
    }

    /**
     * Returns the game's release year.
     * @return the game's release year.
     */
    public int getYEAR() {
        return YEAR;
    }

    /**
     * Returns the game's image URL.
     * @return the game's image URL.
     */
    public String getIMAGEURL() {
        return IMAGEURL;
    }
    
    /**
     * Returns the game's string representation.
     * @return the game's string representation.
     */
    @Override
    public String toString() {
        return "Name: " + NAME + "\n" +
                "Genre: " + GENRE + "\n" +
                "ESRB Rating: " + ESRBRATING + "\n" +
                "Platform: " + PLATFORM + "\n" +
                "Publisher: " + PUBLISHER + "\n" +
                "Critic Score: " + CRITICSCORE + "\n" +
                "Total Sales: " + TOTALSHIPPED + "\n" +
                "Global Sales: " + GLOBALSALES + "\n" +
                "North America Sales: " + NASALES + "\n" +
                "Europe Sales: " + EUSALES + "\n" +
                "Japan Sales: " + JPSALES + "\n" +
                "Other Sales: " + OTHERSALES + "\n" +
                "Release Year: " + YEAR + "\n";
    }
}
