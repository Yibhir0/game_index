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
    private final String PLATFORM;
    private final String PUBLISHER;
    private final double CRITICSCORE;
    private final double GLOBALSALES;
    private final double NASALES;
    private final double EUSALES;
    private final double JPSALES;
    private final double OTHERSALES;
    private final int YEAR;
    private final double USERRATING;
    private final List<String> FEEDBACK;
    private final String IMAGE_URL;

    /**
     * A constructor for all the required parameters for a game.
     * 
     * @param NAME The name of the game.
     * @param GENRE The genre of the game.
     * @param ESRBRATING The ESRTB rating of the game.
     * @param PLATFORM The platform for the game.
     * @param PUBLISHER The publisher of the game.
     * @param CRITICSCORE The Critic's score of the game.
     * @param GLOBALSALES The Global Sales of the game.
     * @param NASALES The North American sales of the game.
     * @param EUSALES The European sales of the game.
     * @param JPSALES The Japanese sales of the game.
     * @param OTHERSALES The other sales of the game.
     * @param YEAR The release year of the game.
     */
    public TransformedGameData(String NAME,
            String GENRE,
            String ESRBRATING,
            String PLATFORM,
            String PUBLISHER,
            double CRITICSCORE,
            double GLOBALSALES,
            double NASALES,
            double EUSALES,
            double JPSALES,
            double OTHERSALES,
            int YEAR) {
        this.NAME = NAME;
        this.GENRE = GENRE;
        this.ESRBRATING = ESRBRATING;
        this.PLATFORM = PLATFORM;
        this.PUBLISHER = PUBLISHER;
        this.CRITICSCORE = CRITICSCORE;
        this.GLOBALSALES = GLOBALSALES;
        this.NASALES = NASALES;
        this.EUSALES = EUSALES;
        this.JPSALES = JPSALES;
        this.OTHERSALES = OTHERSALES;
        this.YEAR = YEAR;
        USERRATING = 0;
        FEEDBACK = new ArrayList<>();
        IMAGE_URL = normaliseString(NAME) +
                "_" +
                normaliseString(PLATFORM) +
                ".jpg";
    }

    /**
     * Returns the game's image URL.
     * @return the game's image URL.
     */
    public String getIMAGE_URL() {
        return IMAGE_URL;
    }
    
    private String normaliseString(String s) {
        return s.replaceAll("[^A-Za-z0-9 ]", "")
                                .replaceAll(" ", "_")
                                .toLowerCase();
    }

    /**
     * Returns the game's user rating.
     * @return the game's user rating.
     */
    public double getUSERRATING() {
        return USERRATING;
    }

    /**
     * Returns the game's feedback.
     * @return the game's feedback.
     */
    public List<String> getFEEDBACK() {
        return FEEDBACK;
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
                + "Critic Score: " + CRITICSCORE + "\n"
                + "Global Sales: " + GLOBALSALES + "\n"
                + "North America Sales: " + NASALES + "\n"
                + "Europe Sales: " + EUSALES + "\n"
                + "Japan Sales: " + JPSALES + "\n"
                + "Other Sales: " + OTHERSALES + "\n"
                + "Release Year: " + YEAR + "\n";
    }
}
