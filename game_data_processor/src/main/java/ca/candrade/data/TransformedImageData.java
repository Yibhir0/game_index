package ca.candrade.data;

import java.awt.image.BufferedImage;

/**
 * Object used for storing a game's name and the blob image for it.
 * @author Christian Andrade
 */
public class TransformedImageData {
    private final String FILENAME;
    private final BufferedImage BIMAGE;

    /**
     * A constructor for all the required parameters for an image.
     * 
     * @param NAME The game name.
     * @param PLATFORM The game platform.
     * @param BIMAGE The game image.
     */
    public TransformedImageData(String NAME, String PLATFORM, BufferedImage BIMAGE) {
        this.FILENAME = normaliseString(NAME) +
                "_" +
                normaliseString(PLATFORM) +
                ".jpg";
        this.BIMAGE = BIMAGE;
    }
    
    private String normaliseString(String s) {
        return s.replaceAll("[^A-Za-z0-9 ]", "")
                                .replaceAll(" ", "_")
                                .toLowerCase();
    }

    /**
     * Returns the name of the image file.
     * @return the name of the image file.
     */
    public String getFILENAME() {
        return FILENAME;
    }

    /**
     * Returns the game image.
     * @return the game image.
     */
    public BufferedImage getBIMAGE() {
        return BIMAGE;
    }
    
}
