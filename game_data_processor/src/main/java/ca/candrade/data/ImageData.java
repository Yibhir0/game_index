package ca.candrade.data;

/**
 * Object used for storing a game's name and the blob image for it.
 * @author Christian Andrade
 */
public class ImageData {
    private final String NAME;
    private final String PLATFORM;
    private final String URL;

    /**
     * A constructor for the basic properties of an image.
     * 
     * @param NAME the game's name.
     * @param PLATFORM the game's platform.
     * @param URL to the game's image.
     */
    public ImageData(String NAME, String PLATFORM, String URL) {
        this.NAME = NAME;
        this.PLATFORM = PLATFORM;
        this.URL = URL;
    }

    /**
     * the game's name.
     * @return the game's name.
     */
    public String getNAME() {
        return NAME;
    }
    
    /**
     * the game's platform.
     * @return the game's platform.
     */
    public String getPLATFORM() {
        return PLATFORM;
    }

    /**
     * Returns the URL of the game's image.
     * @return the URL of the game's image.
     */
    public String getURL() {
        return URL;
    }
}
