const fs = require('fs')

var versions = []
if (process.env.BUILDSINGLEBRANCH == "true") {
    versions.push({
        version: process.env.BRANCH,
        dirPath: "documentation",
        url: "/documentation"
    })
}
else {
    var file = fs.readFileSync('latestDocVersions').toString()
    var versionsFromFile = file.split("\n")
    var data = versionsFromFile.filter(function (version) {
        return version != null || version.length > 0
    });
    for (let i = 0; i < 3; i++) {
        version = data[i]
        versions.push({
            version: version,
            dirPath: i == 0 ? "documentation" : version,
            url: i == 0 ? "/documentation" : "/" + version,
        })
    }
}

console.log("Generating documentation revisions file for versions")
console.log(JSON.stringify(versions))
fs.writeFile('hugo/data/revisions.json', JSON.stringify(versions), function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
});