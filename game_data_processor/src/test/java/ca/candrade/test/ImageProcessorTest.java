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

    public ImageProcessorTest() {
        IP = new ImageProcessor();
    }

    @Test
    public void testAzureConnection() {
        LOG.info("testAzureConnection");
        deleteBlob();
        Assert.assertEquals(15528, countBlobs());
    }

    private int countBlobs() {
        int counter = 0;
        for (BlobItem blobItem : IP.getContainerClient().listBlobs()) {
            counter -= -1;
        }
        return counter;
    }

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

    @Test
    public void testStoredandDownloadedEquality() throws IOException {
        LOG.info("testStoredandDownloadedEquality");
        deleteBlob();
        ImageData imageData = new ImageData("test", "test", "/games/boxart/default.jpg");
        IP.processImage(imageData);
        downloadBlob();
        Assert.assertTrue(performComparison());
    }

    private boolean performComparison() throws IOException {
        File downloaded = new File("./src/main/resources/json_data/image_data/test_test.jpg");
        File created = new File("./src/test/resources/image_data/test_test.jpg");
        BufferedImage downloadedImage = ImageIO.read(downloaded);
        BufferedImage createdImage = ImageIO.read(created);
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

    private void downloadBlob() {
        try {
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(CONNECTIONSTRING);

            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            CloudBlobContainer container = blobClient.getContainerReference("imagedata");

            CloudBlockBlob blob = container.getBlockBlobReference("src/main/resources/json_data/image_data/test_test.jpg");

            blob.downloadToFile("./src/test/resources/image_data/test_test.jpg");
        } catch (Exception e) {
            LOG.error(e.getLocalizedMessage());
        }
    }

    private void deleteBlob() {
        try {
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(CONNECTIONSTRING);

            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            CloudBlobContainer container = blobClient.getContainerReference("imagedata");

            CloudBlockBlob blob = container.getBlockBlobReference("src/main/resources/json_data/image_data/test_test.jpg");

            blob.deleteIfExists();
        } catch (Exception e) {
            LOG.error(e.getLocalizedMessage());
        }
    }
}
