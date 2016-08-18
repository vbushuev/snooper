App.generic.Storage = {

    /**
     * Stores data
     * @param name
     * @param value
     */
    store: function (name, value) {
        localStorage.setItem(name, value)
    },

    /**
     * Retrieves stored data
     * @param name
     * @returns {*}
     */
    retrieve: function (name) {
        return localStorage.getItem(name);
    },

    /**
     * Clears stored data
     * @param name
     */
    clear: function (name) {
        localStorage.removeItem(name);
    },

    Cookie: {
        store: function (name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else {
                var expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },

        retrieve: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        },

        clear: function (name) {
            createCookie(name, "", -1);
        }
    }

};