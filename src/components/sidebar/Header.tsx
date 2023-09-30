interface HeaderProps {
  username: string;
  onLogout: () => void;
}

function Header({ username, onLogout }: HeaderProps) {
  return (
    <div className="header">
      <p>Welcome, {username}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Header;
