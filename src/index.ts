import { App, CfnOutput, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Bucket, EventType } from 'aws-cdk-lib/aws-s3';
import { SnsDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Topic } from 'aws-cdk-lib/aws-sns';

const app = new App();
const stack = new Stack(app, "sns-add-object-created-notification");

const topic = new Topic(stack, "topic", {
  topicName: "my-topic",
  displayName: "My Topic",
});

const bucket = new Bucket(stack, "bucket", {
  autoDeleteObjects: true,
  removalPolicy: RemovalPolicy.DESTROY,
});

bucket.addEventNotification(
  EventType.OBJECT_CREATED,
  new SnsDestination(topic)
);

new CfnOutput(stack, "Topic", {
  value: topic.topicName,
});
new CfnOutput(stack, "Bucket", {
  value: bucket.bucketName,
});
