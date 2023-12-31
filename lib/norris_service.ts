import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";


export class NorrisService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);


        const handler = new lambda.Function(this, "NorrisHandler", {
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromAsset("resources"),
            handler: "norris.handler",
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