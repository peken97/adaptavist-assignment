import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class NorrisService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const layerAxios = new lambda.LayerVersion(this, "AxiosLayer", {
            code: lambda.Code.fromAsset("resources/layers/axios"),
            compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
            description: "Axios layer",
        });

        const layerSlackUtils = new lambda.LayerVersion(this, "SlackLayer", {
            code: lambda.Code.fromAsset("resources/layers/slack-utils"),
            compatibleRuntimes: [lambda.Runtime.NODEJS_18_X],
            description: "Slack layer",
        });

        const handler = new lambda.Function(this, "NorrisHandler", {
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromAsset("resources"),
            handler: "norris.handler",
            environment: {
                API_URL: "https://api.chucknorris.io/jokes/random"
            },
            layers: [
                layerAxios, layerSlackUtils
            ],
        });

        const api = new apigateway.RestApi(this, "norris-jokes-api", {
            restApiName: "Chuck Norris Jokes Service",
            description: "This service generates Chuck Norris jokes!",
        });

        const getNorrisJokeIntegration = new apigateway.LambdaIntegration(handler, {
            requestTemplates: { "application/json": '{ "statusCode": "200" }' },
        });

        api.root.addMethod("POST", getNorrisJokeIntegration);

    }
}