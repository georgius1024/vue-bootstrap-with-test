dt=$(date +%F-%T)
7z a -r  snapshots/ss-$dt.7z *.* -xr!.git -xr!.trash -xr!snapshots -xr!node_modules -xr!public
