function maximumPoints(arr) {

    let days = arr.length
    let tasks = arr[0].length
    let n = arr[0].length
    let dp = Array.from({length : days}, () => Array(tasks).fill(-1))

    function geek_memo(days,last_task) {
        if(days == 0) {
            if(dp[days][last_task] != -1) return dp[days][last_task]

            let curr_maxi = 0
            for(let j=0;j<n;j++) {
                if( j!= last_task) {
                    // let curr_point = arr[0][j]
                    curr_maxi = Math.max(curr_maxi,arr[0][j])
                }
            }
            return curr_maxi
        }

        if(last_task < n) {
            if(dp[days][last_task] != -1) {
                return dp[days][last_task]
            }
        }

        let maxi = 0
        for(let i=0;i<n;i++) {
            if( i != last_task) {
                let currPoint = arr[days][i] + geek_memo(days-1,i)
                maxi = Math.max(maxi,currPoint)
            }
        }

        if(last_task < n) {
            dp[days][last_task] = maxi
        }
        return maxi

        //TC - O(days×tasks×tasks)
        //SC - O(days×tasks)+O(days)
    }

    function geek_tab() {
        dp[0][0] = Math.max(arr[0][1],arr[0][2])
        dp[0][1] = Math.max(arr[0][0], arr[0][2])
        dp[0][2] = Math.max(arr[0][0], arr[0][1])
        dp[0][3] = Math.max(arr[0][0],arr[0][1] ,arr[0][2])

        for(let day = 1; day<days; day++) {
            for(let last_task = 0; last_task<=tasks; last_task++) {
                let maxi = 0
                for(let i=0;i<n;i++) {
                    if( i != last_task) {
                        let currPoint = arr[day][i] + dp[day-1][i]
                        maxi = Math.max(maxi,currPoint)
                    }
                }
                dp[day][last_task] = maxi
            }   
        }

        return dp[days-1][tasks]
    }


    function geek_space() {
        let prev = new Array(tasks+1).fill(-1)
        let curr = new Array(tasks+1).fill(-1)
        prev[0] = Math.max(arr[0][1],arr[0][2])
        prev[1] = Math.max(arr[0][0],arr[0][2])
        prev[2] = Math.max(arr[0][0],arr[0][1])
        prev[3] = Math.max(arr[0][0],arr[0][1],arr[0][2])

        for(let day = 1; day<days; day++) {
            for(let last_task = 0; last_task<=tasks; last_task++) {
                let maxi = 0
                for(let i=0;i<n;i++) {
                    if( i != last_task) {
                        let currPoint = arr[day][i] + prev[i]
                        maxi = Math.max(maxi,currPoint)
                    }
                }
                curr[last_task] = maxi
            }  
            prev = [...curr] 
        }

        return prev[tasks]
    }
    // return geek_memo(days-1,tasks)
    // return geek_tab()
    return geek_space()
}

let arr =  [[1,2,5],[3,1,1],[3,3,3]]
console.log(maximumPoints(arr))

