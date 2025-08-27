package tests.generated;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public final class Operations {

    private Operations() {}

    public static final class Paths {
        // TODO: Populate constants from OpenAPI if needed
        public static final String PRODUCTS = "/products";
    }

    /**
     * Load example JSON from classpath under tests/generated/__mockdata__
     * @param name e.g. "products.get.json"
     * @return file content as String
     */
    public static String loadExample(String name) {
        String resource = "/tests/generated/__mockdata__/" + name;
        try (InputStream is = Operations.class.getResourceAsStream(resource)) {
            if (is == null) {
                throw new IllegalArgumentException("Resource not found: " + resource);
            }
            try (Scanner s = new Scanner(is, StandardCharsets.UTF_8)) {
                s.useDelimiter("\\A");
                return s.hasNext() ? s.next() : "";
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to read resource: " + resource, e);
        }
    }
}
