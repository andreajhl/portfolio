import { ImagePicker } from "desktop-app/components/common/widgets/image-picker";
import { useState } from "react";
import { AvatarUploaderModal } from "desktop-app/components/common/modals/avatar-uploader-modal";
import Maybe from "desktop-app/components/common/helpers/maybe";

type UserAvatarUploaderProps = {};

function UserAvatarUploader(props: UserAvatarUploaderProps) {
  // Conectar con endpoint que recibe el url de la imagen y la seteea como el avatar del usuario.

  // 1.- ✔ El usuario clickea cambiar o agregar foto.
  // 2.- ✔ Se abre la ventana (de window) para seleccionar imagen. * Se necesita un input:file.
  // 3.- Se abre el modal con la imagen seleccionada para recortarla y subirla a Firebase.
  // 4.- Se muestra un loading state mientras la imagen subida se guarda en el backend.

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pickedImage, setPickedImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("/assets/img/user-logo.svg");

  console.log(pickedImage);

  return (
    <>
      <ImagePicker
        previewImageSrc={previewSrc}
        label="Agregar foto"
        onPickImage={(image) => {
          setPickedImage(URL.createObjectURL(image));
          setModalIsOpen(true);
        }}
      />
      <AvatarUploaderModal
        initialImageSrc={pickedImage}
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        onImageUploaded={setPreviewSrc}
      />
    </>
  );
}

export { UserAvatarUploader };
