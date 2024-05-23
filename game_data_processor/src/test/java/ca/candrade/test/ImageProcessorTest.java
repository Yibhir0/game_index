package ca.candrade.test;

import ca.candrade.data.ImageData;
import org.junit.Test;
import ca.candrade.utils.ImageProcessor;
import com.azure.storage.blob.models.BlobItem;
import org.junit.Assert;
import org.slf4j.LoggerFactory;
import com.microsoft.azure.storage.*;
import com.microsoft.azure.storage.blob.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import javax.imageio.ImageIO;

/**
 * A test class used for testing functionality of the ImageProcessor class.
 *
 * @author Christian Andrade
 */
public class ImageProcessorTest {

    //Logger
    private final static org.slf4j.Logger LOG
            = LoggerFactory.getLogger(ImageProcessorTest.class);
    private final ImageProcessor IP;

    private final String CONNECTIONSTRING = "DefaultEndpointsProtocol=https;AccountName=thelemongamerindex;AccountKey=d76IFedWWxqjsrIQNeyDTelYghwjnH2qeb+j1crWMn9VIXmt5qxpxGb1IVHi4iMtXY58Laajv0B4+AStS6r5pA==;EndpointSuffix=core.windows.net";

    /**
     * Default constructor used to instantiate a new ImageProcessor object
     */
    public ImageProcessorTest() {
        IP = new ImageProcessor();
    }

    /**
     * Test method used to determine if the number of blobs found is correct.
     */
    @Test
    public void testAzureConnection() {
        LOG.info("testAzureConnection");
        deleteBlob();
        Assert.assertEquals(15528, countBlobs());
    }

    // Method used to count the number of blobs in an azure container.
    private int countBlobs() {
        int counter = 0;
        for (BlobItem blobItem : IP.getContainerClient().listBlobs()) {
            counter -= -1;
        }
        return counter;
    }

    /**
     * Test method used to determine if the number of blobs found is correct
     * after a new blob has been added.
     */
    @Test
    public void testProcessImage() {
        LOG.info("testAzureConnection");
        deleteBlob();
        int blobCount = countBlobs();
        ImageData imageData = new ImageData("test", "test", "/games/boxart/default.jpg");
        IP.processImage(imageData);
        boolean testPass = blobCount + 1 == countBlobs();
        Assert.assertTrue(testPass);
    }

    /**
     * Test method to determine if the image downloaded from Azure is the same
     * as the one stored locally. This is done by comparing each pixel
     * @throws IOException
     */
    @Test
    public void testStoredandDownloadedEquality() throws IOException {
        LOG.info("testStoredandDownloadedEquality");
        deleteBlob();
        ImageData imageData = new ImageData("test", "test", "/games/boxart/default.jpg");
        IP.processImage(imageData);
        downloadBlob();
        Assert.assertTrue(performComparison());
    }

    // Method used for comparing two images pixel by pixel
    private boolean performComparison() throws IOException {
        File downloaded = new File("./src/main/resources/json_data/image_data/test_test.jpg");
        File created = new File("./src/test/resources/image_data/test_test.jpg");
        BufferedImage downloadedImage = ImageIO.read(downloaded);
        BufferedImage createdImage = ImageIO.read(created);
        // Pixel by pixel comparison occures here
        if (downloadedImage.getWidth() == createdImage.getWidth() && downloadedImage.getHeight() == createdImage.getHeight()) {
            for (int x = 0; x < downloadedImage.getWidth(); x++) {
                for (int y = 0; y < downloadedImage.getHeight(); y++) {
                    if (downloadedImage.getRGB(x, y) != createdImage.getRGB(x, y)) {
                        downloaded.delete();
                        created.delete();
                        return false;
                    }
                }
            }
        } else {
            downloaded.delete();
            created.delete();
            return false;
        }
        downloaded.delete();
        created.delete();
        return true;
    }

    // Method used to download a specific blob from a container.
    private void downloadBlob() {
        try {
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(CONNECTIONSTRING);

            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            CloudBlobContainer container = blobClient.getContainerReference("imagedata");

            CloudBlockBlob blob = container.getBlockBlobReference("src/main/resources/json_data/image_data/test_test.jpg");

            blob.downloadToFile("./src/test/resources/image_data/test_test.jpg");
        } catch (StorageException | IOException | URISyntaxException | InvalidKeyException e) {
            LOG.error(e.getLocalizedMessage());
        }
    }

    // Method used to delete a specific blob from a container.
    private void deleteBlob() {
        try {
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(CONNECTIONSTRING);

            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            CloudBlobContainer container = blobClient.getContainerReference("imagedata");

            CloudBlockBlob blob = container.getBlockBlobReference("src/main/resources/json_data/image_data/test_test.jpg");

            blob.deleteIfExists();
        } catch (StorageException | URISyntaxException | InvalidKeyException e) {
            LOG.error(e.getLocalizedMessage());
        }
    }
}
