import { Box, IBoundingBox, IRect } from '../classes/index';
import { FaceDetection } from '../classes/FaceDetection';
import {
  isWithFaceDetection,
  WithFaceDetection,
} from '../factories/WithFaceDetection';
import { DrawBox } from './DrawBox';

export type TDrawDetectionsInput =
  | IRect
  | IBoundingBox
  | FaceDetection
  | WithFaceDetection<{}>;

export function drawDetections(
  canvasArg: string | HTMLCanvasElement,
  detections: TDrawDetectionsInput | Array<TDrawDetectionsInput>,
) {
  const detectionsArray = Array.isArray(detections) ? detections : [detections];

  detectionsArray.forEach((det) => {
    // eslint-disable-next-line no-nested-ternary

    // eslint-disable-next-line no-nested-ternary
    const box = det instanceof FaceDetection ? det.box : isWithFaceDetection(det) ? det.detection.box : new Box(det);

    const label = undefined;
    new DrawBox(box, { label }).draw(canvasArg);
  });
}
