package ca.candrade.data;

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
    }

    public String getNAME() {
        return NAME;
    }

    public String getGENRE() {
        return GENRE;
    }

    public String getESRBRATING() {
        return ESRBRATING;
    }

    public String getPLATFORM() {
        return PLATFORM;
    }

    public String getPUBLISHER() {
        return PUBLISHER;
    }

    public double getCRITICSCORE() {
        return CRITICSCORE;
    }

    public double getGLOBALSALES() {
        return GLOBALSALES;
    }

    public double getNASALES() {
        return NASALES;
    }

    public double getEUSALES() {
        return EUSALES;
    }

    public double getJPSALES() {
        return JPSALES;
    }

    public double getOTHERSALES() {
        return OTHERSALES;
    }

    public int getYEAR() {
        return YEAR;
    }

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
