const playClickSound = (volume = 0.2) => {
  const audio = new Audio('/son/click.mp3');
  audio.volume = volume;
  audio.play().catch(() => {});
};

export default playClickSound;