import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as norris_service from '../lib/norris_service';

export class AdaptavistServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new norris_service.NorrisService(this, 'Norris');


  }
}
