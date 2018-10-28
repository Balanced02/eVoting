const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '16px',
};

const floatingButton = {
	/* Floating Button */
  position:'fixed',
  width:'60px',
  height:'60px',
  bottom:'40px',
  right: '40px',
  backgroundColor:'#0C9',
  color:'#FFF',
  borderRadius: '50px',
  textAlign: 'center',
  boxShadow: '2px 2px 3px #999',
};

const gutter = 16;
const basicStyle = {
  rowStyle,
  colStyle,
  gutter,
  floatingButton,
};

const animEnter  = {
  opacity: 0.01
}
 
animEnter.animEnterActive =  {
  opacity: 2,
  transition: 'opacity 5s ease-in'
}

export default basicStyle;
