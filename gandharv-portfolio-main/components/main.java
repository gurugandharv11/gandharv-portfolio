class main {
    publich static void main (String [] args){
        Scanner sc= new scanner (System.in);
        string s=sc.next;
        string t=sc.next;
        int n=s.length();
        int m= t.length();
        int [][] dp=new int[n+1][m+1];
        for(int i=0;i<n;i++){
            for(int j=0;j<m;j++){
                if(s.charAt(s-1)==t.charAt(t-1)){
                    dp[i][j]=dp[i-1][j-1]+1;

                }else {
                    dp[i][j]=Math.max(dp[i-1][j],dp[i][j-1]);

                }
            }
        }
        //print lcs 
        Stringbuilder ans=new stringBuilder();
        int i=n;
        int j=m;
        while(i>0 && j>0){
            if(s.charAt(i-1)==t.charAt(j-1)){
                ans.append(s.charAt(i-1));
                i--;
                j--;

            }else if (dp[i-1][j]>dp[i][j-1]){
                i--;
            }else {
                j--;
            }
        }
        system.out.println(ans.reverse().to string());
    }
}