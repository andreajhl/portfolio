import {
  MutedIcon,
  PauseIcon,
  PlayIcon,
  VolumeIcon
} from "desktop-app/components/common/icons";
import styles from "./styles.module.scss";
import React from "react";

type OverlayHeaderProps = {
  isPlaying: boolean;
  IsMuted: boolean;
  onTogglePlay: () => void;
  onToggleAudio: () => void;
};

const OverlayHeader = (props: OverlayHeaderProps) => {
  const { isPlaying, IsMuted, onToggleAudio, onTogglePlay } = props;
  return (
    <div className={styles.VideoControls}>
      {isPlaying ? (
        <PauseIcon onClick={onTogglePlay} />
      ) : (
        <PlayIcon onClick={onTogglePlay} />
      )}
      {!IsMuted ? (
        <VolumeIcon onClick={onToggleAudio} />
      ) : (
        <MutedIcon onClick={onToggleAudio} />
      )}
    </div>
  );
};

export default OverlayHeader;
