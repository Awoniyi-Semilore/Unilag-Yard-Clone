    import React, { useState, useContext, useEffect } from 'react';
    import { FiPlus, FiUser, FiSearch } from 'react-icons/fi';
    import { FaCaretDown } from 'react-icons/fa';
    import { Link } from 'react-router-dom';
    import { AuthContext } from '../pages/AuthContext';
    import { doc, setDoc, getDoc, deleteDoc, } from 'firebase/firestore';
    import { deleteUser } from 'firebase/auth';
    import { auth, db } from '../pages/firebase';


    const Header = () => {
      const { user, logout } = useContext(AuthContext);
      const [showDropped, setShowDropped] = useState(false);
      const [showProfile, setShowProfile] = useState(false);
      const [showSettings, setShowSettings] = useState(false);
      const [settings, setSettings] = useState({
        notifications: 'enabled',
        emailUpdates: 'subscribed',
      });

      const dropDown = () => {
      };

      const toggleProfile = () => {
        setShowProfile((prev) => !prev);
        setShowSettings(false);
      };

      const toggleSettings = () => {
        setShowSettings((prev) => !prev);
        setShowProfile(false);
      };

      const handleLogout = () => {
        logout();
        setShowDropped(false);
      };

      const handleDeleteAccount = async () => {
        const confirmation = window.confirm("This action cannot be undone. Press OK to delete your account or Cancel to go back.");
        if (!confirmation) return;

        try {
          const userAuth = auth.currentUser;
          await deleteDoc(doc(db, "users", userAuth.uid)); // Delete Firestore user data
          await deleteUser(userAuth);                      // Delete Auth account
          logout();                                        // Clear local session
          alert("Your account has been deleted.");
        } catch (err) {
          console.error("Account deletion error:", err);
          alert("Failed to delete account. Try logging in again.");
        }
      };


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings((prev) => ({ ...prev, [name]: value }));
      };

      const handleSettingsSave = async (e) => {
        e.preventDefault();
        try {
          await setDoc(doc(db, 'userSettings', user.uid), settings);
          alert('Settings saved.');
        } catch (err) {
          console.error('Error saving settings:', err);
        }
      };

      useEffect(() => {
        const fetchSettings = async () => {
          if (user) {
            const docRef = doc(db, 'userSettings', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setSettings(docSnap.data());
            }
          }
        };
        fetchSettings();
      }, [user]);

      return (
        <div>
          {user ? (
            <div className='header-div'>
              <div>
                <Link to="/home" className='logo'>Unilag Yard</Link>
              </div>
              <div className='logo-right'>
                <Link to="/allProduct" className='logo-btn-flex'>
                  <FiSearch size={24} color="white" />
                  <h5 className='logo-btn'>Search</h5>
                </Link>
                <Link to="/addProduct" className='logo-btn-flex'>
                  <FiPlus size={24} color="white" />
                  <h5 className='logo-btn'>Add Product</h5>
                </Link>

                <div
                  className='logo-btn-flex'
                  onClick={dropDown}
                  onMouseEnter={() => setShowDropped(true)}
                  onMouseLeave={() => setShowDropped(false)}
                >
                  {user.photoURL && (
                    <img src={user.photoURL} alt="Profile" className="profile-img" />
                  )}
                  <h5 className='logo-btn'>Welcome, {user.username || user.displayName || 'User'}</h5>
                  <FaCaretDown size={12} color="white" />
                  {showDropped && (
                    <div className="dropdown-menu">
                      <h6 onClick={toggleProfile}  style={{ cursor: 'pointer' }}>My Account</h6>
                      {showProfile && (
                        <div className="dropdown-sub">
                          <p>Username: {user.username || user.displayName || currentUser.displayName }</p>
                          <p>Email: {user.email}</p>
                          {user.photoURL && <img src={user.photoURL} alt="Profile" className="profile-img" />}
                        </div>
                      )}
                      <h6 onClick={toggleSettings}  style={{ cursor: 'pointer' }}>Settings</h6>
                      {showSettings && (
                        <form className="dropdown-sub" onSubmit={handleSettingsSave}>
                          <p><strong>Notifications:</strong></p>
                          <div className='radios'>
                            <label>
                              <input
                                type="radio"
                                name="notifications"
                                value="enabled"
                                checked={settings.notifications === 'enabled'}
                                onChange={handleInputChange}
                              />
                              Enable
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="notifications"
                                value="disabled"
                                checked={settings.notifications === 'disabled'}
                                onChange={handleInputChange}
                              />
                              Disable
                            </label>

                          </div>
                          <p><strong>Email Updates:</strong></p>
                          <div className='radios'>
                            <label>
                              <input
                                type="radio"
                                name="emailUpdates"
                                value="subscribed"
                                checked={settings.emailUpdates === 'subscribed'}
                                onChange={handleInputChange}
                              />
                              Subscribe
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="emailUpdates"
                                value="unsubscribed"
                                checked={settings.emailUpdates === 'unsubscribed'}
                                onChange={handleInputChange}
                              />
                              Unsubscribe
                            </label>
                            <button type="submit" className='save'>Save Settings</button>
                          </div>
                        </form>
                      )}
                      <h6 onClick={handleDeleteAccount} style={{ cursor: 'pointer', color: 'red' }}>Delete Account</h6>
                      <h6 onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</h6>
                    </div>
                  )}
                </div>
                
                
              </div>

              <div
                className='burger'
                onClick={dropDown}
                onMouseEnter={() => setShowDropped(true)}
                onMouseLeave={() => setShowDropped(false)}
              >
                <FaCaretDown size={120} color="#4caf50" />
                {showDropped && (
                  <div className="dropdown-menu1">

                    <div className='logo-right1'>
                      <Link to="/allProduct" className='logo-btn-flex1'>
                        <FiSearch size={24} color="white" />
                        <h5 className='logo-btn'>Search</h5>
                      </Link>
                      <Link to="/addProduct" className='logo-btn-flex1'>
                        <FiPlus size={24} color="white" />
                        <h5 className='logo-btn'>Add Product</h5>
                      </Link>

                      <div
                        className='logo-btn-flex1'
                        onClick={dropDown}
                        onMouseEnter={() => setShowDropped(true)}
                        onMouseLeave={() => setShowDropped(false)}
                      >
                        {user.photoURL && (
                          <img src={user.photoURL} alt="Profile" className="profile-img" />
                        )}
                        <h5 className='logo-btn'>Welcome, {user.username || user.displayName || 'User'}</h5>
                        <FaCaretDown size={12} color="white" />
                        {showDropped && (
                          <div className="dropdown-menu2">
                            <h6 onClick={toggleProfile}  style={{ cursor: 'pointer' }}>My Account</h6>
                            {showProfile && (
                              <div className="dropdown-sub">
                                <p>Username: {user.username || user.displayName || currentUser.displayName }</p>
                                <p>Email: {user.email}</p>
                                {user.photoURL && <img src={user.photoURL} alt="Profile" className="profile-img" />}
                              </div>
                            )}
                            <h6 onClick={toggleSettings}  style={{ cursor: 'pointer' }}>Settings</h6>
                            {showSettings && (
                              <form className="dropdown-sub" onSubmit={handleSettingsSave}>
                                <p><strong>Notifications:</strong></p>
                                <div className='radios'>
                                  <label>
                                    <input
                                      type="radio"
                                      name="notifications"
                                      value="enabled"
                                      checked={settings.notifications === 'enabled'}
                                      onChange={handleInputChange}
                                    />
                                    Enable
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="notifications"
                                      value="disabled"
                                      checked={settings.notifications === 'disabled'}
                                      onChange={handleInputChange}
                                    />
                                    Disable
                                  </label>

                                </div>
                                <p><strong>Email Updates:</strong></p>
                                <div className='radios'>
                                  <label>
                                    <input
                                      type="radio"
                                      name="emailUpdates"
                                      value="subscribed"
                                      checked={settings.emailUpdates === 'subscribed'}
                                      onChange={handleInputChange}
                                    />
                                    Subscribe
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      name="emailUpdates"
                                      value="unsubscribed"
                                      checked={settings.emailUpdates === 'unsubscribed'}
                                      onChange={handleInputChange}
                                    />
                                    Unsubscribe
                                  </label>
                                  <button type="submit" className='save'>Save Settings</button>
                                </div>
                              </form>
                            )}
                            <h6 onClick={handleDeleteAccount} style={{ cursor: 'pointer', color: 'red' }}>Delete Account</h6>
                            <h6 onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</h6>
                          </div>
                        )}
                      </div>
                    </div>
                  
                  </div>

                )}
              </div>

            </div>
          ) : (
            <div className='header-div'>
              <div>
                <Link to="/home" className='logo'>Unilag Yard</Link>
              </div>
              <div className='logo-right'>
                <Link to="/allProduct" className='logo-btn-flex'>
                  <FiSearch size={24} color="white" />
                  <h5 className='logo-btn'>Search</h5>
                </Link>
                <Link to="/login" className='logo-btn-flex'>
                  <h5 className='logo-btn'>Login/Signup</h5>
                </Link>
              </div>
              <div
                className='burger'
                onClick={dropDown}
                onMouseEnter={() => setShowDropped(true)}
                onMouseLeave={() => setShowDropped(false)}
              >
                <FaCaretDown size={80} color="#4caf50" />
                {showDropped && (
                  <div className="dropdown-menu">
                    <div className='logo-right1'>
                      <Link to="/allProduct" className='logo-btn-flex'>
                        <FiSearch size={24} color="white" />
                        <h5 className='logo-btn'>Search</h5>
                      </Link>
                      <Link to="/login" className='logo-btn-flex'>
                        <h5 className='logo-btn'>Login/Signup</h5>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    };

    export default Header;
