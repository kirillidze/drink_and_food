'use strict';
export class AJAXStorage {
	constructor(name) {
		this.stringName = `KIRILLIDZE_${name}_STORAGE`;
		this.ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
		this.updatePassword = null;

		this.info = {};
		$.ajax({
			url: this.ajaxHandlerScript,
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				f: 'INSERT',
				n: this.stringName,
				v: '{}'
			},
			error: this.errorHandler
		});

		$.ajax({
			url: this.ajaxHandlerScript,
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				f: 'READ',
				n: this.stringName
			},
			success: this.readReady.bind(this),
			error: this.errorHandler.bind(this)
		});

	}
	addValue(key, value) {
		//читаем данные из сервера
		this.restoreInfo();
		//добавляем информацию в массив
		this.info[key] = value;
		//изменяем строку
		this.storeInfo();
	}
	getValue(key) {
		//читаем данные из сервера
		this.restoreInfo();
		if (key in this.info) {
			//если ключ есть, то возвращаем его значение
			return this.info[key];
		} else {
			return false;
		}
	}
	deleteValue(key) {
		//читаем данные из сервера
		this.restoreInfo();
		if (key in this.info) {
			//если ключ есть, то удаляем его
			delete this.info[key];
			//изменяем строку
			this.storeInfo();
			return true;
		} else {
			return false;
		}
	}
	getKeys() {
		//читаем данные из сервера
		this.restoreInfo();
		if (Object.keys(this.info).length === 0) {
			return 'В базе нет данных';
		} else {
			return Object.keys(this.info);
		}
	}

	restoreInfo() {
		$.ajax({
			url: this.ajaxHandlerScript,
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				f: 'READ',
				n: this.stringName
			},
			success: this.readReady,
			error: this.errorHandler
		});
	}

	readReady(callresult) {
		if (callresult.error !== undefined)
			alert(callresult.error);
		else if (callresult.result !== "") {
			this.info = JSON.parse(callresult.result);
		}
	}

	storeInfo() {
		this.updatePassword = Math.random();
		$.ajax({
			url: this.ajaxHandlerScript,
			type: 'POST',
			cache: false,
			dataType: 'json',
			data: {
				f: 'LOCKGET',
				n: this.stringName,
				p: this.updatePassword
			},
			success: this.lockGetReady.bind(this),
			error: this.errorHandler.bind(this)
		});
	}

	lockGetReady(callresult) {
		if (callresult.error !== undefined)
			alert(callresult.error);
		else {
			$.ajax({
				url: this.ajaxHandlerScript,
				type: 'POST',
				cache: false,
				dataType: 'json',
				data: {
					f: 'UPDATE',
					n: this.stringName,
					v: JSON.stringify(this.info),
					p: this.updatePassword
				},
				success: this.updateReady,
				error: this.errorHandler
			});
		}
	}

	updateReady(callresult) {
		if (callresult.error !== undefined)
			alert(callresult.error);
	}

	errorHandler(jqXHR, statusStr, errorStr) {
		alert(statusStr + ' ' + errorStr);
	}
}