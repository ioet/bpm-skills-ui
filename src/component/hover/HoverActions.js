export const HoverAction = {
  OVER: 'HOVER_OVER',
  OUT: 'HOVER_OUT',
};

export const hoverOver = id => ({
  type: HoverAction.OVER,
  id,
});

export const hoverOut = () => ({
  type: HoverAction.OUT,
});
