var express = require('express');
const mongoose = require('mongoose');
const Entree = require('./entreeAPI')
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

var port = 9000;

const uri = 'mongodb+srv://shawn4seg:MGS4best@cluster0.w44jxfu.mongodb.net/projet2';

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to MongoDB database');
});


app.post('/api/converter', async (req, res) =>{
    var body = req.body
    var message = ""
    
    if(typeof body.value === 'number' && !isNaN(body.value))
    {
        switch(body.type)
        {
            case "foot2meter":
                var convertedValue = body.value/3.28084
                message = "Converted Value: "+convertedValue+" meter"
                break;
            case "meter2foot":
                var convertedValue = body.value*3.28084
                message = "Converted Value: "+convertedValue+" feet"
                break;
            case "kilo2lbs":
                var convertedValue = body.value*2.20462
                message = "Converted Value: "+convertedValue+" lbs"
                break;
            case "lbs2kilo":
                var convertedValue = body.value/2.20462
                message = "Converted Value: "+convertedValue+" kg"
                break;
            case "cel2fahr":
                var convertedValue = (body.value*9/5)+32
                message = "Converted Value: "+convertedValue+" F"
                break;
            case "fahr2cel":
                var convertedValue = (body.value-32)*5/9
                message = "Converted Value: "+convertedValue+" C"
                break;
            case "btc2cad":
                var convertedValue = body.value*40367.66
                message = "Converted Value: "+convertedValue+" CAD"
                break;
            case "cad2btc":
                var convertedValue = body.value/40367.66
                message = "Converted Value: "+convertedValue+" BTC"
                break;
            case "litre2gal":
                var convertedValue = body.value/3.78541
                message = "Converted Value: "+convertedValue+" gallons"
                break;
            case "gal2litre":
                var convertedValue = body.value*3.78541
                message = "Converted Value: "+convertedValue+" L"
                break;
            default:
                message = "Ce type n'est pas dans nos conversions."
                break;

        
        
        }

        const newEntree = new Entree({
            ip_adresse:req.ip,
            type_requete: body.type
        })

        try{
            const saveEntree = await newEntree.save()
        }
        catch(error)
        {
            res.status(400).json({message:error.message})
        }
    }
    else
    {
        res.status(400).send("Invalid input.");
    }
    

    res.send(message);
});



// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);