set dt=%date%_%time:~3,2%-%time:~6,2%
7z a -r  snapshots/ss-%dt%.7z *.* -xr!.git -xr!.trash -xr!snapshots -xr!node_modules -xr!public
