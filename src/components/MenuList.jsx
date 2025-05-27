const MenuList = () => {
  const menus = Array(6).fill('/assets/sample-images/menu-thumb.jpg');

  return (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {menus.map((src, i) => (
        <img key={i} src={src} alt={`메뉴 ${i}`} className="rounded" />
      ))}
    </div>
  );
};

export default MenuList;
