filemtime ( string filename )
返回文件上次被修改的时间，出错时返回 FALSE。时间以 Unix 时间戳的方式返回，可用于 date()。
例如：$a=filemtime("log.txt");
           echo "修改时间：".date("Y-m-d H:i:s",$a);
filectime ( string filename )
返回文件上次 inode 被修改的时间，如果出错则返回 FALSE。时间以 Unix 时间戳的方式返回。
例如：$a=filectime("log.txt");
           echo "创建时间：".date("Y-m-d H:i:s",$a);
fileatime ( string filename )
返回文件上次被访问的时间，如果出错则返回 FALSE。时间以 Unix 时间戳的方式返回。
例如：$a=fileatime("log.txt");
          echo "修改时间：".date("Y-m-d H:i:s",$a);