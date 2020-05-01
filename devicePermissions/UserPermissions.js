import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

class UserPermissions {
    getCameraPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status != "granted") {
                alert("You need to allow the app to see your photos to be able to PostIT");
            }
        }
    };
}

export default new UserPermissions();