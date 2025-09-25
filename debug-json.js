// Test JSON serialization
const testData = {
  success: true,
  settings: [
    { key: "company_name", value: "Konveksi Murbay" },
    { key: "company_tagline", value: "Jagonya konveksi" }
  ],
  message: "Settings retrieved successfully"
};

console.log("Original object:");
console.log(testData);

console.log("\nJSON.stringify result:");
console.log(JSON.stringify(testData));

console.log("\nJSON.stringify with formatting:");
console.log(JSON.stringify(testData, null, 2));
