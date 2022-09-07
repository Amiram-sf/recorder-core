import { Error } from "./../../Instructure/Constants/Error";
import { IMedia } from "./../../Instructure/Models/IConstraints";
import { mediaCapability } from "./../../Utils/index";

export const Media = async function (mediaConfig: IMedia) {

    const getUserMedia = async () => {
        try {
            return await navigator.mediaDevices.getUserMedia(mediaConfig.Constraints);
        } catch (e) {
            throw Error.RejectPermission
        }
    }

    try {
        if (!mediaCapability()) {
            throw Error.Security
        }

        const stream = await getUserMedia();
        return new MediaRecorder(stream, mediaConfig?.mediaRecorderOptions);

    } catch (e) {
        throw e
    }
}