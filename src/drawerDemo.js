const DrawerContents = () => (
  <div className="DrawerContents__Container">Hi Im the drawer contents</div>
);const Drawer = ({ isOpen }) => (
  <div className={`Drawer__Container ${isOpen && "Drawer__Container--isOpen"}`}>
    <DrawerContents />
  </div>
);