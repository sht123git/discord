
const config = {
  allowedFileFormats: ["application/pdf"],
  fileSizeMBLimit: 20,
  filesLimit: 1
};
const fileValidator = (files) => {
  const { allowedFileFormats, fileSizeMBLimit, filesLimit } = config;
  const { length } = files;
  const size = files[0].size;
  const type  = files[0].type;
  let err = false;
  let result = {
    isValidFile: false,
    errVal: err
  };
  if (length === 0) {
    return result;
  } else if (length > filesLimit) {
    err =
      filesLimit > 1
        ? `Only ${filesLimit} files are allowed to upload`
        : `Only one file is allowed to upload`;
  } else if (!allowedFileFormats.includes(type)) {
    err = "File format must be PDF";
  } else if (size / 1024 / 1024 > fileSizeMBLimit) {
    err = `File size exceeded the limit of ${fileSizeMBLimit}MB`;
  } else {
    result.isValidFile = true;
  }
  result.errVal = err;
  return result;
};
export default fileValidator;
