package ca.candrade.data;

/**
 * Object used for storing specific properties of a game as JSON data.
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
            String YEAR) {
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
    }
    
    private double normaliseNumber(String value) {
        if (value.equals("") || value.equals("N/A")) return 0;
        return Double.parseDouble(value);
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

    public double getTOTALSHIPPED() {
        return TOTALSHIPPED;
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
