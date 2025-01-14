import { IPoint, Point } from '../classes/index';
import { FaceExpressions } from '../faceExpressionNet/index';
import { isWithFaceDetection } from '../factories/WithFaceDetection';
import {
  isWithFaceExpressions,
  WithFaceExpressions,
} from '../factories/WithFaceExpressions';
import { DrawTextField } from './DrawTextField';

export type DrawFaceExpressionsInput =
  | FaceExpressions
  | WithFaceExpressions<{}>;

export function drawFaceExpressions(
  canvasArg: string | HTMLCanvasElement,
  faceExpressions: DrawFaceExpressionsInput | Array<DrawFaceExpressionsInput>,
  minConfidence = 0.1,
  textFieldAnchor?: IPoint,
) {
  const faceExpressionsArray = Array.isArray(faceExpressions)
    ? faceExpressions
    : [faceExpressions];

  faceExpressionsArray.forEach((e) => {
    // eslint-disable-next-line no-nested-ternary
    const expr = e instanceof FaceExpressions ? e : isWithFaceExpressions(e) ? e.expressions : undefined;
    if (!expr) {
      throw new Error('drawFaceExpressions - expected faceExpressions to be FaceExpressions | WithFaceExpressions<{}> or array thereof');
    }

    const sorted = expr.asSortedArray();
    const resultsToDisplay = [sorted[0]];
    minConfidence *= 2;

    const anchor = isWithFaceDetection(e)
      ? e.detection.box.topLeft
      : textFieldAnchor || new Point(0, 0);

    const drawTextField = new DrawTextField(
      resultsToDisplay.map((exprLocal) => `${exprLocal.expression}`),
      anchor,
    );
    drawTextField.draw(canvasArg);
  });
}
