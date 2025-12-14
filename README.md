<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lent Project File Tree</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header h1 {
            color: white;
            font-size: 2.5rem;
            margin-bottom: 10px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .header .path {
            color: rgba(255, 255, 255, 0.8);
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            background: rgba(0, 0, 0, 0.2);
            padding: 8px 15px;
            border-radius: 10px;
            display: inline-block;
        }

        .file-tree {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .root-folder {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 1.3rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #eaeaea;
        }

        .root-folder .icon {
            font-size: 1.8rem;
        }

        .tree-item {
            margin-left: 30px;
            position: relative;
        }

        .tree-item::before {
            content: '';
            position: absolute;
            left: -15px;
            top: 0;
            bottom: 0;
            width: 1px;
            background: #ddd;
        }

        .tree-item:last-child::before {
            bottom: 50%;
        }

        .folder, .file {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
            position: relative;
        }

        .folder:hover, .file:hover {
            background: #f5f5f5;
            transform: translateX(5px);
        }

        .folder .icon, .file .icon {
            font-size: 1.2rem;
            width: 24px;
            text-align: center;
        }

        .folder {
            color: #2c3e50;
            font-weight: 600;
        }

        .file {
            color: #34495e;
            font-weight: 400;
        }

        .folder-name, .file-name {
            flex-grow: 1;
        }

        .folder-type {
            font-size: 0.8rem;
            color: #7f8c8d;
            background: #ecf0f1;
            padding: 2px 8px;
            border-radius: 4px;
        }

        .children {
            margin-left: 25px;
            border-left: 1px dashed #ddd;
            padding-left: 15px;
            position: relative;
        }

        .children::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 15px;
            height: 20px;
            border-bottom: 1px dashed #ddd;
        }

        /* Specific icons */
        .icon-folder { color: #f39c12; }
        .icon-file { color: #3498db; }
        .icon-react { color: #61dafb; }
        .icon-css { color: #264de4; }
        .icon-json { color: #f0db4f; }
        .icon-js { color: #f7df1e; }
        .icon-html { color: #e34c26; }
        .icon-svg { color: #ffb13b; }
        .icon-md { color: #83cd29; }
        .icon-config { color: #6c5ce7; }

        /* Project structure info */
        .project-info {
            margin-top: 40px;
            padding: 25px;
            background: #f8f9fa;
            border-radius: 15px;
            border-left: 5px solid #667eea;
        }

        .project-info h3 {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }

        .info-item {
            padding: 15px;
            background: white;
            border-radius: 8px;
            border: 1px solid #eaeaea;
        }

        .info-item .label {
            font-size: 0.9rem;
            color: #7f8c8d;
            margin-bottom: 5px;
        }

        .info-item .value {
            font-weight: 600;
            color: #2c3e50;
        }

        .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-left: 10px;
        }

        .badge.folder-badge {
            background: #fff3cd;
            color: #856404;
        }

        .badge.file-badge {
            background: #d1ecf1;
            color: #0c5460;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .file-tree {
                padding: 15px;
            }
            
            .tree-item {
                margin-left: 20px;
            }
            
            .folder, .file {
                padding: 6px 8px;
                font-size: 0.9rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📁 Lent Project File Tree</h1>
            <div class="path">e:\mern\memes\mymeme\lent</div>
        </div>

        <div class="file-tree">
            <div class="root-folder">
                <span class="icon icon-folder">📁</span>
                <span class="folder-name">lent</span>
                <span class="folder-type">directory</span>
            </div>

            <div class="tree-item">
                <div class="folder" onclick="toggleFolder('public')">
                    <span class="icon icon-folder">📁</span>
                    <span class="folder-name">public</span>
                    <span class="folder-type">folder</span>
                </div>
                <div class="children" id="public-children">
                    <div class="file">
                        <span class="icon icon-svg">🖼️</span>
                        <span class="file-name">vite.svg</span>
                        <span class="folder-type">file</span>
                    </div>
                </div>
            </div>

            <div class="tree-item">
                <div class="folder" onclick="toggleFolder('src')">
                    <span class="icon icon-folder">📁</span>
                    <span class="folder-name">src</span>
                    <span class="folder-type">folder</span>
                </div>
                <div class="children" id="src-children">
                    <div class="tree-item">
                        <div class="folder" onclick="toggleFolder('assets')">
                            <span class="icon icon-folder">📁</span>
                            <span class="folder-name">assets</span>
                            <span class="folder-type">folder</span>
                        </div>
                        <div class="children" id="assets-children">
                            <div class="file">
                                <span class="icon icon-svg">🖼️</span>
                                <span class="file-name">react.svg</span>
                                <span class="folder-type">file</span>
                            </div>
                        </div>
                    </div>

                    <div class="tree-item">
                        <div class="folder" onclick="toggleFolder('components')">
                            <span class="icon icon-folder">📁</span>
                            <span class="folder-name">components</span>
                            <span class="folder-type">folder</span>
                        </div>
                        <div class="children" id="components-children">
                            <!-- Addmenu -->
                            <div class="tree-item">
                                <div class="folder" onclick="toggleFolder('addmenu')">
                                    <span class="icon icon-folder">📁</span>
                                    <span class="folder-name">addmenu</span>
                                    <span class="folder-type">folder</span>
                                </div>
                                <div class="children" id="addmenu-children">
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Admenu.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Editmenu.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-css">🎨</span>
                                        <span class="file-name">admenu.css</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Admin -->
                            <div class="tree-item">
                                <div class="folder" onclick="toggleFolder('admin')">
                                    <span class="icon icon-folder">📁</span>
                                    <span class="folder-name">admin</span>
                                    <span class="folder-type">folder</span>
                                </div>
                                <div class="children" id="admin-children">
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Admin.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Randomadmin.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-css">🎨</span>
                                        <span class="file-name">admin.css</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Header -->
                            <div class="tree-item">
                                <div class="folder" onclick="toggleFolder('header')">
                                    <span class="icon icon-folder">📁</span>
                                    <span class="folder-name">header</span>
                                    <span class="folder-type">folder</span>
                                </div>
                                <div class="children" id="header-children">
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Header.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-css">🎨</span>
                                        <span class="file-name">header.css</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Hero -->
                            <div class="tree-item">
                                <div class="folder" onclick="toggleFolder('hero')">
                                    <span class="icon icon-folder">📁</span>
                                    <span class="folder-name">hero</span>
                                    <span class="folder-type">folder</span>
                                </div>
                                <div class="children" id="hero-children">
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Hero.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-css">🎨</span>
                                        <span class="file-name">hero.css</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Menu -->
                            <div class="tree-item">
                                <div class="folder" onclick="toggleFolder('menu')">
                                    <span class="icon icon-folder">📁</span>
                                    <span class="folder-name">menu</span>
                                    <span class="folder-type">folder</span>
                                </div>
                                <div class="children" id="menu-children">
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Menu.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">MenuDetails.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-css">🎨</span>
                                        <span class="file-name">menu.css</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-css">🎨</span>
                                        <span class="file-name">menudetails.css</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Orders -->
                            <div class="tree-item">
                                <div class="folder" onclick="toggleFolder('orders')">
                                    <span class="icon icon-folder">📁</span>
                                    <span class="folder-name">orders</span>
                                    <span class="folder-type">folder</span>
                                </div>
                                <div class="children" id="orders-children">
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Order.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-css">🎨</span>
                                        <span class="file-name">order.css</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Register -->
                            <div class="tree-item">
                                <div class="folder" onclick="toggleFolder('register')">
                                    <span class="icon icon-folder">📁</span>
                                    <span class="folder-name">register</span>
                                    <span class="folder-type">folder</span>
                                </div>
                                <div class="children" id="register-children">
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">EditUser.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Login.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">Register.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-css">🎨</span>
                                        <span class="file-name">register.css</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                </div>
                            </div>

                            <!-- UserAdmin -->
                            <div class="tree-item">
                                <div class="folder" onclick="toggleFolder('userAdmin')">
                                    <span class="icon icon-folder">📁</span>
                                    <span class="folder-name">userAdmin</span>
                                    <span class="folder-type">folder</span>
                                </div>
                                <div class="children" id="userAdmin-children">
                                    <div class="file">
                                        <span class="icon icon-react">⚛️</span>
                                        <span class="file-name">UsersAdmin.jsx</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                    <div class="file">
                                        <span class="icon icon-css">🎨</span>
                                        <span class="file-name">useradmin.css</span>
                                        <span class="folder-type">file</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tree-item">
                        <div class="folder" onclick="toggleFolder('pages')">
                            <span class="icon icon-folder">📁</span>
                            <span class="folder-name">pages</span>
                            <span class="folder-type">folder</span>
                        </div>
                        <div class="children" id="pages-children">
                            <div class="file">
                                <span class="icon icon-react">⚛️</span>
                                <span class="file-name">menu.jsx</span>
                                <span class="folder-type">file</span>
                            </div>
                        </div>
                    </div>

                    <div class="tree-item">
                        <div class="folder" onclick="toggleFolder('upload')">
                            <span class="icon icon-folder">📁</span>
                            <span class="folder-name">upload</span>
                            <span class="folder-type">folder</span>
                        </div>
                        <div class="children" id="upload-children">
                            <div class="file">
                                <span class="icon icon-react">⚛️</span>
                                <span class="file-name">Getupload.jsx</span>
                                <span class="folder-type">file</span>
                            </div>
                            <div class="file">
                                <span class="icon icon-react">⚛️</span>
                                <span class="file-name">Upload.jsx</span>
                                <span class="folder-type">file</span>
                            </div>
                        </div>
                    </div>

                    <!-- Root files in src -->
                    <div class="file">
                        <span class="icon icon-react">⚛️</span>
                        <span class="file-name">App.jsx</span>
                        <span class="folder-type">file</span>
                    </div>
                    <div class="file">
                        <span class="icon icon-react">⚛️</span>
                        <span class="file-name">Protected.jsx</span>
                        <span class="folder-type">file</span>
                    </div>
                    <div class="file">
                        <span class="icon icon-css">🎨</span>
                        <span class="file-name">index.css</span>
                        <span class="folder-type">file</span>
                    </div>
                    <div class="file">
                        <span class="icon icon-react">⚛️</span>
                        <span class="file-name">main.jsx</span>
                        <span class="folder-type">file</span>
                    </div>
                </div>
            </div>

            <!-- Root level files -->
            <div class="file">
                <span class="icon icon-folder">📁</span>
                <span class="file-name">.gitignore</span>
                <span class="folder-type">file</span>
            </div>
            <div class="file">
                <span class="icon icon-md">📝</span>
                <span class="file-name">README.md</span>
                <span class="folder-type">file</span>
            </div>
            <div class="file">
                <span class="icon icon-js">📜</span>
                <span class="file-name">eslint.config.js</span>
                <span class="folder-type">file</span>
            </div>
            <div class="file">
                <span class="icon icon-html">🌐</span>
                <span class="file-name">index.html</span>
                <span class="folder-type">file</span>
            </div>
            <div class="file">
                <span class="icon icon-json">⚙️</span>
                <span class="file-name">package-lock.json</span>
                <span class="folder-type">file</span>
            </div>
            <div class="file">
                <span class="icon icon-json">📦</span>
                <span class="file-name">package.json</span>
                <span class="folder-type">file</span>
            </div>
            <div class="file">
                <span class="icon icon-js">📜</span>
                <span class="file-name">vite.config.js</span>
                <span class="folder-type">file</span>
            </div>
        </div>

        <div class="project-info">
            <h3>📊 Project Statistics</h3>
            <div class="info-grid">
                <div class="info-item">
                    <div class="label">Total Folders</div>
                    <div class="value">14 <span class="badge folder-badge">Folders</span></div>
                </div>
                <div class="info-item">
                    <div class="label">Total Files</div>
                    <div class="value">30 <span class="badge file-badge">Files</span></div>
                </div>
                <div class="info-item">
                    <div class="label">React Components</div>
                    <div class="value">17 <span class="badge" style="background:#61dafb;color:#000;">JSX</span></div>
                </div>
                <div class="info-item">
                    <div class="label">CSS Files</div>
                    <div class="value">8 <span class="badge" style="background:#264de4;color:#fff;">CSS</span></div>
                </div>
                <div class="info-item">
                    <div class="label">Project Type</div>
                    <div class="value">React + Vite App</div>
                </div>
                <div class="info-item">
                    <div class="label">Last Generated</div>
                    <div class="value">2025-12-14</div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function toggleFolder(folderId) {
            const children = document.getElementById(folderId + '-children');
            if (children) {
                children.style.display = children.style.display === 'none' ? 'block' : 'none';
            }
        }

        // Initialize with all folders expanded
        document.querySelectorAll('.children').forEach(el => {
            el.style.display = 'block';
        });
    </script>
</body>
</html>