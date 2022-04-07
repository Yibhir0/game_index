package ca.candrade.utils;

import ca.candrade.data.ImageData;
import ca.candrade.data.TransformedImageData;
import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import javax.imageio.ImageIO;
import org.imgscalr.Scalr;
import org.slf4j.LoggerFactory;

/**
 * Class used for converting an image to a blob and then uploading it to an
 * Azure blob storage account.
 *
 * @author Christian Andrade
 */
public class ImageProcessor {

    //Logger
    private final static org.slf4j.Logger LOG
            = LoggerFactory.getLogger(ImageProcessor.class);
    private final BlobContainerClient CONTAINERCLIENT;

    /**
     * Constructor for the image processor which instantiates the necessary 
     * parameters.
     */
    public ImageProcessor() {
        // Connection string needed for connecting to azure.
        String connectStr = "DefaultEndpointsProtocol=https;AccountName=thelemongamerindex;AccountKey=d76IFedWWxqjsrIQNeyDTelYghwjnH2qeb+j1crWMn9VIXmt5qxpxGb1IVHi4iMtXY58Laajv0B4+AStS6r5pA==;EndpointSuffix=core.windows.net";
        BlobServiceClient blobServiceClient
                = new BlobServiceClientBuilder()
                        .connectionString(connectStr)
                        .buildClient();
        String containerName = "imagedata";
        if (blobServiceClient.getBlobContainerClient(containerName).exists()) {
            CONTAINERCLIENT = blobServiceClient.getBlobContainerClient(containerName);
        } else {
            CONTAINERCLIENT
                = blobServiceClient.createBlobContainer(containerName);
        }
    }

    /**
     * Method used for downloading the image, resizing it, and then uploading it
     * to Azure.
     * @param imageData
     */
    public void processImage(ImageData imageData) {
        TransformedImageData tImageData = downloadImage(imageData);
        createImageFile(tImageData);
        uploadImage(tImageData);
    }

    /**
     * Method used for downloading the images from the url provided in the dataset.
     * if no image is found it returns the default image.
     */
    private TransformedImageData downloadImage(ImageData imageData) {
        BufferedImage bImage = null;
        try {
            URL url = new URL("https://www.vgchartz.com" + imageData.getURL());
            bImage = ImageIO.read(url);
            if (bImage == null) {
                url = new URL("http://www.vgchartz.com" + imageData.getURL());
                bImage = ImageIO.read(url);
            }
            if (bImage == null) {
                throw new IOException("Image not found for: "
                        + imageData.getNAME()
                        + " at URL: "
                        + "https://www.vgchartz.com"
                        + imageData.getURL()
                );
            }
            bImage = resizeImage(bImage);
            return new TransformedImageData(imageData.getNAME(),
                    imageData.getPLATFORM(),
                    bImage);
        } catch (IOException ex) {
            LOG.warn(ex.getLocalizedMessage());
        }
        return getDefault(imageData);
    }

    /**
     * Method used for getting the default image from the website
     */
    private TransformedImageData getDefault(ImageData imageData) {
        BufferedImage bImage = null;
        try {
            URL url = new URL("https://www.vgchartz.com/games/boxart/default.jpg");
            bImage = resizeImage(ImageIO.read(url));
            return new TransformedImageData(imageData.getNAME(),
                    imageData.getPLATFORM(),
                    bImage);
        } catch (IOException e) {
            LOG.error(e.getLocalizedMessage() + " THIS SHOULD NOT HAPPEN!");
        }
        return null;
    }
    
    /**
     * Method used for creating an image file according the a TransformedImageData
     * object.
     */
    private void createImageFile(TransformedImageData tid) {
        try {
            ImageIO.write(tid.getBIMAGE(),
                    "jpg",
                    new File(
                            "./src/main/resources/json_data/image_data/"
                            + tid.getFILENAME()
                    ));
        } catch (IOException ex) {
            LOG.error(ex.getLocalizedMessage());
        }
    }
    
    /**
     * Method used for resizing an image to a reasonable size that is easy for
     * a user to see. This is done using org.imgscalr.Scalr.
     */
    private BufferedImage resizeImage(BufferedImage bImage) {
        int newWidth;
        if (bImage.getWidth() >= 512) {
            newWidth = 512;
        } else {
            newWidth = 256;
        }
        int newHeight = (bImage.getHeight() / bImage.getWidth()) * newWidth;
        return Scalr.resize(bImage,
                Scalr.Method.AUTOMATIC,
                Scalr.Mode.AUTOMATIC,
                newWidth,
                newHeight,
                Scalr.OP_ANTIALIAS);
    }

    /**
     * Method used for uploading the image provided to the azure blob container.
     */
    private void uploadImage(TransformedImageData tImageData) {
        String basePath = "./src/main/resources/json_data/image_data/";
        BlobClient blobClient
                = CONTAINERCLIENT
                        .getBlobClient(basePath + tImageData.getFILENAME());
        blobClient.uploadFromFile(basePath + tImageData.getFILENAME());
    }
    
    
    public BlobContainerClient getContainerClient() {
        return CONTAINERCLIENT;
    }
}
