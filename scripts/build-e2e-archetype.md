# Build Karate E2E Archetype

```bash
cd e2e/karate
mvn -q -DskipTests archetype:create-from-project
cd target/generated-sources/archetype
mvn -q -DskipTests clean install
```

Resulting coordinates:
- groupId: com.izertis.qa
- artifactId: karate-e2e-archetype
- version: 1.0.0
