<?php

// use GeminiAPI\Client;
// use GeminiAPI\Resources\ModelName;
// use GeminiAPI\Resources\Parts\TextPart;

require  __DIR__ . '/vendor/autoload.php';

use \ConvertApi\ConvertApi;

ConvertApi::setApiCredentials('token_BHaBsELO');

$result = ConvertApi::convert('txt', ['File' => './testfile.pdf'], 'pdf');


# save all result files to folder
$result->saveFiles('c:\xampp\htdocs\crb-react\PHP');

# get conversion cost


// $client = new Client('AIzaSyD54wt_Pp1Jb3Jrc-bXxi5UXk17ZsF1w6Q');
// $response = $client->generativeModel(ModelName::GEMINI_1_5_FLASH)->generateContent(
//     new TextPart('provide the url for 10 books for a college-level chemistry subject from openstax.org. only include the url in the response'),
// );

// print $response->text();
// PHP: A server-side scripting language used to create dynamic web applications.
// Easy to learn, widely used, and open-source.