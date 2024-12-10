<?php

require __DIR__ . '/../../vendor/autoload.php';

use GeminiAPI\Client;
use GeminiAPI\Resources\ModelName;
use GeminiAPI\Resources\Parts\TextPart;

$text = "I love everyone who are cute!";

// Construct a sentiment analysis query
$queryText = "Analyze if the following text sounds positive, neutral, or negative. The output should only contain one of the three choices: \"$text\"";

$client = new Client('AIzaSyD54wt_Pp1Jb3Jrc-bXxi5UXk17ZsF1w6Q');
$response = $client->generativeModel(ModelName::GEMINI_1_5_FLASH)->generateContent(
    new TextPart($queryText),
);

print $response->text();
// PHP: A server-side scripting language used to create dynamic web applications.
// Easy to learn, widely used, and open-source.
