export const createAnim = (
  anims,
  key,
  prefix,
  suffix,
  frameCount,
  repeat = -1
) => {
  return anims.create({
    key,
    frames: anims.generateFrameNames("allImages", {
      start: 1,
      end: frameCount,
      zeroPad: 1,
      prefix,
      suffix
    }),
    frameRate: 20,
    repeat
  });
};
