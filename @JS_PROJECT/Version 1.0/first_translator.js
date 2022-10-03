
// open file

let selectedFile;
console.log(window.XLSX);
document.getElementById('input').addEventListener("change", (event) => {
    selectedFile = event.target.files[0];
})

let data = [{
    "name": "jayanth",
    "data": "scd",
    "abc": "sdef"
}]

// for first file (category file)

let output_json = [];

let number_of_product = 0;

function main_machine(rowObject) {

    let product = {
        "article_number": "",
        "article_name": "",
        "description": "",
        "price": "",
        "article_url": "",
        "manufacturer": "",
        "product_group_key": "",
        "product_group": "",
        "EAN": "",
        "HBNR": "",
        "shipping_cost_text": "",
        "quantity": "",
        "shipping_costs_in_advance_DE": "",
        "max_delivery_quantity": "",
        "energy_efficiency_class": "",
    };
    let sourceLang = 'de';
    let targetLang = 'it';
    let temp_url;
    var sourceText;
    product["article_number"] = rowObject.article_number;

    sourceText = rowObject.article_name;
    temp_url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
    
    $.getJSON(temp_url)
    .done(function (data) {
        console.log(resultText);
        product["article_name"] = data[0][0][0];
    
        product["description"] = rowObject.description;     /////
        product["price"] = rowObject.price;
        product["article_url"] = rowObject.article_url;
        //product["manufacturer"] = translate_auto_func(rowObject.manufacturer);   /////
        product["product_group_key"] = rowObject.product_group_key;
        //product["product_group"] = translate_auto_func(rowObject.product_group); /////
        product["EAN"] = rowObject.EAN;
        product["HBNR"] = rowObject.HBNR;
        //product["shipping_cost_text"] = translate_auto_func(rowObject.shipping_cost_text);   /////
        product["quantity"] = rowObject.quantity;
        product["shipping_costs_in_advance_DE"] = rowObject.shipping_costs_in_advance_DE;
        product["max_delivery_quantity"] = rowObject.max_delivery_quantity;
        product["energy_efficiency_class"] = rowObject.energy_efficiency_class;
    
        output_json.push(product);
        number_of_product ++;

        if(number_of_product >= 19686)
        {
            console.log(output_json);
        }
    });
}


document.getElementById('button').addEventListener("click", () => {

    document.getElementById("button").style = "display: none;";
    document.getElementById("button_loading").style = "display: block;";
    document.getElementById("wait_div").innerHTML = "Please wait. it will take several minutes.(Attendere prego. ci vorranno diversi minuti.)";

    XLSX.utils.json_to_sheet(data, 'out.xlsx');
    if (selectedFile) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event) => {
            let data = event.target.result;
            let workbook = XLSX.read(data, { type: "binary" });
            console.log(workbook);
            workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                console.log(rowObject);

                rowObject && rowObject.map((rowObject, index) => (
                    main_machine(rowObject)
                ));

                //document.getElementById("jsondata").innerHTML = JSON.stringify(output_json, undefined, 4);
                //document.getElementById("jsondata_f2").innerHTML = JSON.stringify(output_json_f2, undefined, 4);

                // try {
                //     var myFile = "cyberport-feedsmitmengen_resellervertriebnewde(translate).xlsx";
                //     var myWorkSheet = XLSX.utils.json_to_sheet(output_json);
                //     var myWorkBook = XLSX.utils.book_new();
                //     XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "Data");
                //     XLSX.writeFile(myWorkBook, myFile);
                // } catch (err) {
                //     console.log("Error:", err);
                // }

                document.getElementById("button_loading").style = "display: none;";
                document.getElementById("button_done").style = "display: block;";
            });
        }
    }
});